// import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const numbers = [1, 2, 5];
let subject = Observable.create(
    observer => {
        let index = 0;

        let produceValue = () => {
            observer.next(numbers[index++]);

            if (index < numbers.length) {
                setTimeout(produceValue, 1000);
            } else {
                observer.complete();
            }
        };

        produceValue();
    }
)
.map(n => n * 4)
.filter( n => n > 4);


subject.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);