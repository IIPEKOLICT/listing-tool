# listing-tool
NodeJS tool for easy create listings of code (NodeJS 16+)

```shell
git clone git@github.com:IIPEKOLICT/listing-tool.git
cd listing-tool
npm i
```

### Usage
Change settings.json file, as you need (see example):
```javascript
{
  /*
   put in params array as many listing params objects as you need 
   (every config will generate own listing file, using listing params object)
   */
  "params": [
    {
      "root": "/home/iipekolict/github/hotel-jvm-client/app/src", // absolute path of folder with searched code
      "output": "listing.ts", // name and extension of output listing file (can contain folder pathes if needed)
      "comment": { // parametres of comment about copied file in listing
        "enabled": true, // change to false, if need
        "start": "// path: ", // start mark of comment (before file path)
        "end": "" // end mark of comment
      },
      "paddings": 1, // number of lines between copied files blocks
      "encoding": "utf8", // encoding
      "strict": false, // if true, will used only field
      "ignore": { 
        "items": [], // files and folders to ignore
        "extensions": [] // extenstions to ignore (can be like .kt, js, etc.)
      },
      "only": {
        "items": [], // files and folders, only which use
        "extensions": [] // only selected extensions use
      }
    }
  ]
}
```

After that, put in root directory of this repo:
```shell
npm run start
```

After that in `dist` folder will appear your listings!
