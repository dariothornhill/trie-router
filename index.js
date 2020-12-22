function Route(path, handler) {
 this.path = path;
 this.handler = handler
}

const routeTable = [
  new Route('/products',  () => console.log('<Products />')),
  new Route('/foo/bar', () => console.log('<FooBar />')),
  new Route('/foo',  () => console.log('<Foo />')),
]

function TrieNode(path, route = null) {
  this.value = path || null;
  this.children = [],
  this.handler = route?.handler || null;
}

/**
* sets the given Route Handler
**/
TrieNode.prototype.setHandler = function (handler) {
  this.handler = handler;
}

/**
* Returns true if a nodes value propperty is equal to value
**/
const checkValue = (node , value) => {
  return node.value === value;
}

/**
* Builds a Trie from our route Table
**
function buildTrie(){
  const leafMarker = false
  const root = new TrieNode(null);
  for(let x=0;x<routes.length;x++) {
    let current = root
    const path = routes[x].path.slice(1).split('/')
      for(let y=0;y<path.length;y++){
        childIndex = current.children.findIndex(node => checkValue(node, path[y]))
        if (childIndex === -1) {
          const newNode = new TrieNode(path[y], routes[x])
          current.children.push(newNode)
          current = newNode
        } else {
          current = current.children[childIndex]
          current.setHandler(routes[x].handler)
        }
      }
      console.log(`${current.value} -> leaf`);
      current.children.push(false)
    }
  return root;
}

const trieRoot = buildTrie(routes);
console.log(JSON.stringify(trieRoot,null,2));

/**
* Searches the trie for the route by path name, if found returns it's handler, false otherwise
**/
function searchTrie(root, path) {
   console.log("searching...");
   let current = root
   let found = false
   const pathList = path.slice(1).split('/')
   while (pathList.length > 0) {
     current.handler && current.handler()
     childIndex = current.children.findIndex(node => checkValue(node, pathList[0]))
     if (childIndex !== -1) {
        pathList.shift()
        current = current.children[childIndex]
     } else {
       return false;
     }
   }

   const result = current.children.findIndex(node => node === false)
   console.log({result})
   
   return  result !== -1 ?  current.handler : false;
}
const result = searchTrie(trieRoot ,'/foo')

if (result && typeof result === 'function' ) {
  result();
} else {
  console.log('404', );
}
