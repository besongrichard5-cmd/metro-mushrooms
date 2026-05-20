document.addEventListener('DOMContentLoaded', () => {
    const actionBtn = document.getElementById('action-btn');

    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            alert('Button clicked! Your web app logic goes here.');
        });
    }
});
