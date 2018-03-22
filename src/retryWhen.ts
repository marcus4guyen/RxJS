import { Observable } from 'rxjs';

let btnGetMovies = document.getElementById('btnGetMovies');
let moviesElement = document.getElementById('movies');

let clickSource = Observable.fromEvent(btnGetMovies, 'click');

function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });
    
        xhr.open('GET', url);
        xhr.send();
    }).retryWhen(retryStrategy({ attemps: 3, delay: 1500 }));
}

function retryStrategy({ attemps = 4, delay = 1000 }) {
    return function (errors) {
        return errors
                .scan((acc, value) => {
                    return acc + 1;
                }, 0)
                .takeWhile(acc => acc < attemps)
                .delay(delay);
    }
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerHTML = m.title;
        moviesElement.appendChild(div);
    });
}

clickSource.flatMap(e => load('moviess.json'))
            .subscribe(
                renderMovies,
                e => console.log(`error: ${e}`),
                () => console.log('complete')
            );
