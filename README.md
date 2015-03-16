# Train Ride (JS1k 2015)

> An isometric view of a peaceful train trip through a never-ending forest.

My entry for [JS1k](http://js1k.com/2015-hypetrain/).  The submission can be found [here](http://js1k.com/2015-hypetrain/demo/2325).

## Installation

```bash
# install gulp
npm install

# build and run server on localhost:8080
gulp 
```

## Technical details

To achieve the smallest possible filesize the script is first minimized using [UglifyJS](http://lisperator.net/uglifyjs/). This file is then processed by [RegPack](https://github.com/Siorki/RegPack). This process reduces the script from 3518 characters to 1022 characters.