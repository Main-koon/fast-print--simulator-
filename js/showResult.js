export default function showResult(target_El, content) {
    localStorage.setItem(+new Date, content);
    (function paintOnLoad() {
        let temp = [];

        for(let i = 0; i < localStorage.length; i++) {
            temp.push(+localStorage.key(i));
        }
        temp.sort();
        console.log(temp);
        for(let i = 0; i< temp.length; i++){
            let itemTime = new Date(temp[i]);
            target_El.insertAdjacenHTML('afterend',
            `<th>${itemTime.getDate()} /${itemTime.getMonth()} ${itemTime.getHours()} : ${itemTime.getMinutes()} </th>
            <th> ${localStorage.getItem(String(temp[i]))} </th>`
            );
        }
    } )();
}
