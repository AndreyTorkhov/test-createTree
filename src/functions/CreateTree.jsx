import React, { useEffect } from "react";
import "../styles/tree.css";

function createTree(parentNode, servicesObject) {
  function createNode(node, parentNode) {
    const newNode = document.createElement("li");
    newNode.className = "tree-node";
    if (node.price) {
      newNode.textContent = node.name + " (" + node.price + "₽)";
      newNode.style.marginLeft = 3.5 + "rem";
    } else {
      newNode.textContent = ">" + node.name;
    }

    // Рекурсивно создаем дочерние узлы
    const children = servicesObject.services.filter(
      (service) => service.head === node.id
    );
    if (children.length > 0) {
      const childList = document.createElement("ul");
      children.sort((a, b) => a.sorthead - b.sorthead);
      children.forEach((child) => createNode(child, childList));
      newNode.appendChild(childList);
    }
    parentNode.appendChild(newNode);
  }

  parentNode.innerHTML = "";

  // Начинаем построение дерева с корневых узлов
  const rootNodes = servicesObject.services.filter(
    (service) => service.head === null
  );
  rootNodes.forEach((root) => createNode(root, parentNode));
}

const CreateTree = () => {
  useEffect(() => {
    const servicesObject = {
      services: [
        {
          id: 1,
          head: null,
          name: "Проф.осмотр",
          node: 0,
          price: 100.0,
          sorthead: 20,
        },
        {
          id: 2,
          head: null,
          name: "Хирургия",
          node: 1,
          price: 0.0,
          sorthead: 10,
        },
        {
          id: 3,
          head: 2,
          name: "Удаление зубов",
          node: 1,
          price: 0.0,
          sorthead: 10,
        },
        {
          id: 4,
          head: 3,
          name: "Удаление зуба",
          node: 0,
          price: 800.0,
          sorthead: 10,
        },
        {
          id: 5,
          head: 3,
          name: "Удаление 8ого зуба",
          node: 0,
          price: 1000.0,
          sorthead: 30,
        },
        {
          id: 6,
          head: 3,
          name: "Удаление осколка зуба",
          node: 0,
          price: 2000.0,
          sorthead: 20,
        },
        {
          id: 7,
          head: 2,
          name: "Хирургические вмешательство",
          node: 0,
          price: 200.0,
          sorthead: 10,
        },
        {
          id: 8,
          head: 2,
          name: "Имплантация зубов",
          node: 1,
          price: 0.0,
          sorthead: 20,
        },
        {
          id: 9,
          head: 8,
          name: "Коронка",
          node: 0,
          price: 3000.0,
          sorthead: 10,
        },
        {
          id: 10,
          head: 8,
          name: "Слепок челюсти",
          node: 0,
          price: 500.0,
          sorthead: 20,
        },
      ],
    };

    const page = document.getElementById("create-tree");
    createTree(page, servicesObject);
  }, []);

  return <div className="create-tree" id="create-tree"></div>;
};

export default CreateTree;
