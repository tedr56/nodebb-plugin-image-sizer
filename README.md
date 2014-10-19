Image Sizer
===========
This plugin allows you to resize images in Nodebb

The general syntax is:  
```![alt text](http://someurl.com/someimage.png@<size>)```

There are 3 ways to set size:

* absolute:  
```![alt text](http://someurl.com/someimage.png@1920x1080)```

* percent:  
```![alt text](http://someurl.com/someimage.png@50%)```

* scalar multiplier:  
```![alt text](http://someurl.com/someimage.png@0.5)```

note: if you leave off one of width or height in the absolute size, the other will be calculated so as to keep the aspect ratio unchanged.
