/*
* Responsive Table ES6
* Code by M.Bilal93
* https://github.com/mbilal93/responsive-tables/
* */

class responsiveTables {
    constructor(element, opts={}) {
        Object.assign(this,{
            breakpoint: 768,
            onResponsive: new Function,
            onRevert: new Function
        },opts);
        this.element = document.querySelectorAll(element);
        this.prepareTable();
        this.makeResponsive(this.element);
        window.onresize = ()=>{
            this.makeResponsive(this.element);
        };
    }

    prepareTable() {
        this.element.forEach((ele) => {
            const tableID = 'tbl_' + Math.floor(Math.random() * 1000);
            let wrapper = document.createElement('div');
            wrapper.id = tableID;
            wrapper.classList.add('table-responsive-block-container');
            ele.parentNode.insertBefore(wrapper, ele);
            wrapper.appendChild(ele);

            let reswrapper = document.createElement('div');
            reswrapper.classList.add('table-responsive-block');
            wrapper.appendChild(reswrapper);
            let tid = document.getElementById(tableID);
            let block = tid.querySelector(':scope .table-responsive-block');
            let heads = tid.querySelector(':scope table > thead > tr');
            if(heads) {
                heads = heads.children;
            }

            tid.querySelectorAll(':scope table > tbody > tr').forEach((tr,i)=>{
                let tblblock = document.createElement('div');
                tblblock.classList.add('table-block');
                block.appendChild(tblblock);

                Array.from(tr.children).forEach((td,j)=>{
                    let tblrow = document.createElement('div');
                    tblrow.classList.add('block-row');

                    if(heads) {
                        let head = heads[j];
                        let headrow = document.createElement('div');
                        headrow.classList.add('head');
                        headrow.innerHTML = head.innerHTML;
                        tblrow.appendChild(headrow);
                    }

                    let bodyrow = document.createElement('div');
                    bodyrow.classList.add('body');
                    bodyrow.innerHTML = td.innerHTML;
                    tblrow.appendChild(bodyrow);

                    block.childNodes[i].appendChild(tblrow);
                });
            });

        });
    }

    makeResponsive(element) {
        element.forEach((ele) => {
            let parent = ele.parentNode;
            const breakpoint = ele.getAttribute('data-breakpoint') || this.breakpoint;
            if (window.innerWidth >= breakpoint) {
                if(parent.classList.contains('table-responsive-active')) {
                    this.onRevert();
                }
                parent.classList.remove('table-responsive-active');
            } else {
                if(!parent.classList.contains('table-responsive-active')) {
                    this.onResponsive();
                }
                parent.classList.add('table-responsive-active');
            }
        });
    }
}