// 공유하기 버튼 클릭 이벤트

const shareButton = document.querySelector('.share-button-style');
const toast = document.querySelector('.toast');

shareButton.addEventListener('click', (e) => {
    toast.style.display = 'block';
    toast.classList.remove('hide');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            toast.style.display = 'none';
        }, 500);
    }, 3000);
})


// navbar 이벤트
const navButtons = document.querySelectorAll('.tag-name');

navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    });
});