# responsive-tables
Lightweight script to nicely make HTML Table structure responsive.

Usage:
Prerequisites: jQuery Library
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
            $(".your-table-class").responsiveTables(options);

             /*Setup options*/ 
            {
                breakpoint: 768px,  /*set your custom breakpoint here*/ 
                onResponsive: ()=>{ /*Responsive UI event call*/ },
                onRevert: ()=>{ /*Back to default UI event call*/ }
            }

 </script>
```
