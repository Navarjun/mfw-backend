const baseURI = document.querySelector('span#baseURL').innerHTML.trim();
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target);
        const inputs = e.target.querySelectorAll('input');
        let url = e.target.dataset.action.trim();
        const obj = {};
        Array.from(inputs).forEach(input => {
            if (input.value !== '') {
                const name = input.getAttribute('name');
                if (url.indexOf(`:${name}`) !== -1) {
                    url = url.replace(`:${name}`, input.value);
                } else {
                    obj[name] = input.value;
                }
            }
        });

        const method = e.target.dataset.method;
        url = baseURI + url;

        console.log(url, obj);
        $.get(url, obj, (response) => {
            e.target.querySelector('div.response').classList.add('active');
            e.target.querySelector('pre.response').innerHTML = JSON.stringify(response, null, 2);
        }, 'json');
        return false;
    });
});
