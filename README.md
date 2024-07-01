# Responsive Tables
Lightweight Javascript ES6 script make HTML Table responsive.

Demo: https://htmlpreview.github.io/?https://github.com/mbilal93/responsive-tables/blob/main/index.html

Usage:
1 - The Script
```
<script src="js/responsive-tables.min.js"></script>
```

2 - The CSS
```
<script src="css/responsive-table.css"></script>
```

3 - The Setup

```
<script>
            new responsiveTables('.table',options);

             /*Setup options*/ 
            {
                breakpoint: 768px,  /*set your custom breakpoint here*/ 
                onResponsive: ()=>{ /*Responsive UI event call*/ },
                onRevert: ()=>{ /*Back to default UI event call*/ }
            }

 </script>
```
