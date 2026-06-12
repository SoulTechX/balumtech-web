"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/* ——————————————————————————————————
   TYPES
   —————————————————————————————————— */

interface PoolParticle {
  mesh: THREE.Mesh
  active: boolean
  life: number
  decay: number
  baseOpacity: number
  drift: THREE.Vector3
}

interface Pulse {
  type: "parallel" | "meridian"
  lat: number          // degrees, only for parallels
  lon: number          // degrees, only for meridians
  direction: 1 | -1
  frac: number         // 0..1 position along the line
  speed: number
  spawnAccum: number
}

/* ——————————————————————————————————
   HELPERS
   —————————————————————————————————— */

function latLonToVec3(
  latDeg: number,
  lonDeg: number,
  radius: number,
  out: THREE.Vector3
): THREE.Vector3 {
  const lat = THREE.MathUtils.degToRad(latDeg)
  const lon = THREE.MathUtils.degToRad(lonDeg)
  out.set(
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon)
  )
  return out
}

function createCircleLine(
  latDeg: number,
  R: number,
  segments: number,
  color: string,
  opacity: number
): THREE.Line {
  const pts: THREE.Vector3[] = []
  const v = new THREE.Vector3()
  for (let i = 0; i <= segments; i++) {
    const lon = (i / segments) * 360
    latLonToVec3(latDeg, lon, R, v)
    pts.push(v.clone())
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts)
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  })
  return new THREE.Line(geo, mat)
}

function createMeridianLine(
  lonDeg: number,
  R: number,
  segments: number,
  color: string,
  opacity: number
): THREE.Line {
  const pts: THREE.Vector3[] = []
  const v = new THREE.Vector3()
  for (let i = 0; i <= segments; i++) {
    const lat = -90 + (i / segments) * 180
    latLonToVec3(lat, lonDeg, R, v)
    pts.push(v.clone())
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts)
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  })
  return new THREE.Line(geo, mat)
}

/* ——————————————————————————————————
   COMPONENT
   —————————————————————————————————— */

export default function GlobeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    /* ── Renderer ── */
    const W = 540
    const H = 540
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 3.2)

    /* ── Globe group ── */
    const globe = new THREE.Group()
    globe.rotation.x = 0.18
    scene.add(globe)

    const R = 1

    /* ── Parallels ── */
    const parallels = [-60, -45, -30, -15, 0, 15, 30, 45, 60]
    parallels.forEach((lat) => {
      const isEquator = lat === 0
      globe.add(
        createCircleLine(
          lat,
          R,
          128,
          isEquator ? "#00cc55" : "#007733",
          isEquator ? 0.55 : 0.28
        )
      )
    })

    /* ── Meridians ── */
    const meridians: number[] = []
    for (let i = 0; i < 18; i++) meridians.push(i * 20)
    meridians.forEach((lon) => {
      globe.add(createMeridianLine(lon, R, 128, "#007733", 0.28))
    })

    /* ── Nodes at intersections ── */
    const nodeGeo = new THREE.SphereGeometry(0.02, 8, 8)
    const nodeMat = new THREE.MeshBasicMaterial({
      color: "#44ffaa",
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    })
    const nodeVec = new THREE.Vector3()
    const nodeLatitudes = [-60, -30, 0, 30, 60]
    const nodeLongitudes = [0, 40, 80, 120, 160, 200, 240, 280, 320]
    nodeLatitudes.forEach((lat) => {
      nodeLongitudes.forEach((lon) => {
        latLonToVec3(lat, lon, R, nodeVec)
        const m = new THREE.Mesh(nodeGeo, nodeMat)
        m.position.copy(nodeVec)
        globe.add(m)
      })
    })

    /* ── Particle pool ── */
    const POOL_SIZE = 500
    const particleGeo = new THREE.SphereGeometry(0.005, 4, 4)
    const pool: PoolParticle[] = []

    for (let i = 0; i < POOL_SIZE; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: "#33bb66",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(particleGeo, mat)
      mesh.visible = false
      globe.add(mesh)
      pool.push({
        mesh,
        active: false,
        life: 0,
        decay: 0.03,
        baseOpacity: 0.55,
        drift: new THREE.Vector3(),
      })
    }

    function acquireParticle(): PoolParticle | null {
      for (let i = 0; i < POOL_SIZE; i++) {
        if (!pool[i].active) return pool[i]
      }
      return null
    }

    /* ── Pulses ── */
    const pulses: Pulse[] = [
      // Parallels
      { type: "parallel", lat: 0,   lon: 0, direction: 1,  frac: 0.0,  speed: 0.07 + Math.random() * 0.05, spawnAccum: 0 },
      { type: "parallel", lat: 30,  lon: 0, direction: -1, frac: 0.25, speed: 0.07 + Math.random() * 0.05, spawnAccum: 0 },
      { type: "parallel", lat: -30, lon: 0, direction: 1,  frac: 0.5,  speed: 0.07 + Math.random() * 0.05, spawnAccum: 0 },
      { type: "parallel", lat: 45,  lon: 0, direction: -1, frac: 0.75, speed: 0.07 + Math.random() * 0.05, spawnAccum: 0 },
      // Meridians
      { type: "meridian", lat: 0, lon: 0,   direction: 1,  frac: 0.1,  speed: 0.07 + Math.random() * 0.05, spawnAccum: 0 },
      { type: "meridian", lat: 0, lon: 120, direction: -1, frac: 0.4,  speed: 0.07 + Math.random() * 0.05, spawnAccum: 0 },
      { type: "meridian", lat: 0, lon: 240, direction: 1,  frac: 0.7,  speed: 0.07 + Math.random() * 0.05, spawnAccum: 0 },
    ]

    function getPulsePosition(pulse: Pulse, offsetFrac: number, out: THREE.Vector3): void {
      let frac = pulse.frac + offsetFrac * pulse.direction
      frac = ((frac % 1) + 1) % 1 // wrap

      if (pulse.type === "parallel") {
        const lon = frac * 360
        latLonToVec3(pulse.lat, lon, R, out)
      } else {
        const lat = -90 + frac * 180
        latLonToVec3(lat, pulse.lon, R, out)
      }
    }

    function spawnHead(pulse: Pulse): void {
      const pos = new THREE.Vector3()
      getPulsePosition(pulse, 0, pos)
      for (let i = 0; i < 6; i++) {
        const p = acquireParticle()
        if (!p) return
        p.active = true
        p.life = 1
        p.decay = 0.045 + Math.random() * 0.02
        p.baseOpacity = 0.95
        ;(p.mesh.material as THREE.MeshBasicMaterial).color.set("#ccffdd")
        p.mesh.position.set(
          pos.x + (Math.random() - 0.5) * 0.012,
          pos.y + (Math.random() - 0.5) * 0.012,
          pos.z + (Math.random() - 0.5) * 0.012
        )
        p.drift.set(
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001
        )
        p.mesh.visible = true
      }
    }

    function spawnTrail(pulse: Pulse): void {
      const pos = new THREE.Vector3()
      for (let t = 1; t <= 12; t++) {
        const offset = -t * 0.008
        getPulsePosition(pulse, offset, pos)
        for (let j = 0; j < 3; j++) {
          const p = acquireParticle()
          if (!p) return
          p.active = true
          p.life = 1
          p.decay = 0.018 + Math.random() * 0.012
          p.baseOpacity = 0.55
          ;(p.mesh.material as THREE.MeshBasicMaterial).color.set("#33bb66")
          p.mesh.position.set(
            pos.x + (Math.random() - 0.5) * 0.01,
            pos.y + (Math.random() - 0.5) * 0.01,
            pos.z + (Math.random() - 0.5) * 0.01
          )
          p.drift.set(
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001
          )
          p.mesh.visible = true
        }
      }
    }

    /* ── Scroll listener ── */
    function onScroll() {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    /* ── Animation loop ── */
    let currentRotY = 0
    let rafId = 0

    function animate() {
      rafId = requestAnimationFrame(animate)

      // Scroll-driven rotation
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      const targetRotY = (scrollYRef.current / maxScroll) * Math.PI * 3
      currentRotY += (targetRotY - currentRotY) * 0.07
      globe.rotation.y = currentRotY

      // Advance pulses & spawn particles
      for (const pulse of pulses) {
        pulse.frac += pulse.speed * pulse.direction * 0.01
        pulse.frac = ((pulse.frac % 1) + 1) % 1

        pulse.spawnAccum += 1
        if (pulse.spawnAccum >= 1.2) {
          pulse.spawnAccum = 0
          spawnHead(pulse)
          spawnTrail(pulse)
        }
      }

      // Update particles
      for (const p of pool) {
        if (!p.active) continue
        p.life -= p.decay
        if (p.life <= 0) {
          p.active = false
          p.mesh.visible = false
          ;(p.mesh.material as THREE.MeshBasicMaterial).opacity = 0
          continue
        }
        p.mesh.position.x += p.drift.x
        p.mesh.position.y += p.drift.y
        p.mesh.position.z += p.drift.z
        ;(p.mesh.material as THREE.MeshBasicMaterial).opacity =
          p.baseOpacity * p.life
      }

      renderer.render(scene, camera)
    }

    animate()

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)

      // Dispose all geometries & materials in scene
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "50%",
        right: "-160px",
        width: "540px",
        height: "540px",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  )
}
