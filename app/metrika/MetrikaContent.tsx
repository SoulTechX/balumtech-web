/* Comparison table: scrollable con columna fija */
            .compare-wrap {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                margin-bottom: 32px;
                display: block;
                width: 100%;
                padding-bottom: 15px; /* Da un poco de aire para el scroll horizontal */
            }
            
            .compare-table {
                min-width: 580px; 
            }

            /* Hacemos que la primera columna se quede anclada a la izquierda */
            .compare-table th:first-child,
            .compare-table td:first-child {
                position: sticky;
                left: 0;
                background-color: var(--black); /* Usa el fondo oscuro para tapar lo que scrollea por debajo */
                z-index: 2;
                border-right: 1px solid var(--border); /* Línea divisoria para que se note el corte */
            }

            .compare-table th:first-child {
                z-index: 3; /* Asegura que el header quede por encima de las celdas */
            }
