document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('projectsTable');
    if (!table) return;

    let sortDirection = {};
    window.sortTable = function(colIndex) {
        const tbody = table.tBodies[0];
        const rows = Array.from(tbody.rows);
        sortDirection[colIndex] = !sortDirection[colIndex];
        const dir = sortDirection[colIndex] ? 1 : -1;

        rows.sort((a, b) => {
            let textA = a.cells[colIndex].textContent.trim();
            let textB = b.cells[colIndex].textContent.trim();
            if (colIndex === 2) {
                return (parseInt(textA) - parseInt(textB)) * dir;
            }
            return textA.localeCompare(textB, 'uk') * dir;
        });

        rows.forEach(row => tbody.appendChild(row));
    };
    function attachRowEvents(row) {
        row.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#e8f4fd';
        });
        row.addEventListener('mouseout', function() {
            if (!this.classList.contains('selected')) {
                this.style.backgroundColor = '';
            }
        });
        row.addEventListener('click', function() {
            this.classList.toggle('selected');
            this.style.backgroundColor = this.classList.contains('selected') ? '#fff3cd' : '';
        });
    }

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => attachRowEvents(row));
});