window.dom= {
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();//消除string的空格
        return container.content.firstChild;
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        dom.before(node, parent)//先让node与parent成为兄弟，再让node成为parent的子元素
        dom.append(parent, node)
    },
    remove(node) {
        node.parentNode.removeChild(node);
        return node
    },
    empty(node) {
        const {childNodes} = node;
        const array = [];
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))//使用forin循环 x会一直变化
            x = node.firstChild;
        }
        return array
    },
    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {//适配，兼容ie浏览器
        if (arguments.length === 2) {
            if ('interText' in node) {
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        } else if (arguments.length === 1) {
            if ('interText' in node) {
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },
    html(node,string){
        if (arguments.length === 2){
            node.innerHTML = string
        }else if (arguments.length === 1){
            return node.innerHTML
        }
    },
    style(node,name,value){
        if (arguments.length === 3){
            // dom.style(div,"color","red")
            node.style[name] = value
        }else if(typeof name === 'string'){
            // dom.style(div,"color")
            return node.style[name]
        }else if(name instanceof Object){
            //dom.style(div, {"color":"red"})
            const object = name
            for (let key in object){
                node.style[key] = object[key]//变量作为属性，要用中括号
            }
        }
    },
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className) {
            node.classList.remove(className);
        },
        has(node,className){
           return  node.classList.contains(className)
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector,scope){
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n => n !==node)
    },//parentNode.children是伪数组，使用filter函数前需要转换一次
    next(node){
        let  x = node.nextSibling;
        while (x && x.nodeType === 3){
        //如果x存在且x的为文本节点
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling;
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node){
                break
            }
        }
        return i
    }
};
