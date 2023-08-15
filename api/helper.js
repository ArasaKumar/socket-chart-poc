const insertIntoTree = (tree, path, nodeDetail) => {
    if (!path || !path.length) return;

    let current = tree;
    for (let i = 0; i < path.length; i++) {
        let id = path[i];
        let foundChild = current.children.find(child => child.id === id);

        if (!foundChild) {
            let newChild = {
                id: id,
                name: i === path.length - 1 ? nodeDetail.nodeName : '',   // Assign nodeDetail data only to the last node in the path
                title: i === path.length - 1 ? nodeDetail.nodePath : '',  // Same as above
                children: []
            };
            current.children.push(newChild);
            current = newChild;
        } else {
            current = foundChild;
        }
    }
}

export const ltreeToParentChild = (ltreeData) => {
    const ltreeMap = new Map(ltreeData.map(item => [item.nodePath, item]));
    const ltreeLabels = [...ltreeMap.keys()].sort();

    let rootNode = { id: -1, name: "root", title: "root", children: [] };

    ltreeLabels.forEach(label => {
        const path = label.split('.');
        const nodeDetail = ltreeMap.get(label);
        insertIntoTree(rootNode, path, nodeDetail);
    });

    return rootNode;
}
