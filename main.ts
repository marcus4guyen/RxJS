import { Observable } from 'rxjs';
import { load, loadWithFetch } from './loader';

let btnGetMovies = document.getElementById('btnGetMovies');
let moviesElement = document.getElementById('movies');

let clickSource = Observable.fromEvent(btnGetMovies, 'click');

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerHTML = m.title;
        moviesElement.appendChild(div);
    });
}

let subscription = load('movies.json').subscribe(
    renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log('complete!')
);
console.log(subscription);
subscription.unsubscribe();

clickSource.flatMap(e => loadWithFetch('movies.json'))
            .subscribe(
                renderMovies,
                e => console.log(`error: ${e}`),
                () => console.log('complete')
            );
