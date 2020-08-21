export const updateTreeData = (list, key, children) => {
  return list.map(node => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
};

export const dealChild = list => {
  let newList = list.map(item => {
    let { categoryId: key, name: title } = item;
    return { key, title };
  });
  return newList;
};
