const div = dom.find('#test>.red')[0];
console.log(div)
dom.style(div,'color','red');

const divList = dom.find('.red')

dom.each(divList,(n) => {
    console.log(n)
})

const div1 = dom.create("<div>新增了一个div1</div>");
const test = document.getElementById('test');
dom.after(test,div1)