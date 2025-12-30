
$(document).ready(() => {
    // Your code here
    let count = 0;
    const arr = ["action_1", "action_2", "action_3"];
    $('.btntoggle').click(() => {
        $('.showBox').removeClass().addClass("showBox "+arr[count % arr.length]);
        count++;
    })



})