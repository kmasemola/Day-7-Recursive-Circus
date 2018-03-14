const RecursiveCircus = (input) => {
  let nodes = {};

  const InputInst = input
    .split('\n')
    .map((x) => x.trim());

  for ( i = 0; i < InputInst.length; i++) {
    const match = InputInst[i].match(/^([\w]+)\s\((\d+)\)(?:\s->\s)?(.*)$/i);

    const node = {
      name: match[1],
      weight: parseInt(match[2]),
      parent: null,
      children: match[3] ? match[3].split(', ') : [],
    };

    nodes[node.name] = node;
  }

  const keys = Object.keys(nodes);

  for ( i = 0; i < keys.length; i++) {
    const key = keys[i];

    for ( j = 0; j < nodes[key].children.length; j++) {
      const child = nodes[key].children[j];

      nodes[key].children[j] = nodes[child];
      nodes[child].parent = nodes[key];
    }
  }
   
  const root = Object.values(nodes).find((node), node.parent === null);

  return root.name;
};

module.exports = RecursiveCircus;