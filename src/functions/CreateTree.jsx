import React, { useEffect, useState } from "react";
import "../styles/tree.css";

function CreateTree() {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    async function fetchServicesData() {
      try {
        const response = await fetch("URL_ВАШЕГО_API");
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data = await response.json();
        setServicesData(data.services);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }

    fetchServicesData();
  }, []);

  function createTree(parentNode, services) {
    function createNode(node, parentNode) {
      const newNode = document.createElement("li");
      newNode.className = "tree-node";
      if (node.price) {
        newNode.textContent = node.name + " (" + node.price + "₽)";
        newNode.style.marginLeft = 3.5 + "rem";
      } else {
        newNode.textContent = ">" + node.name;
      }
      const children = services.filter((service) => service.head === node.id);
      if (children.length > 0) {
        const childList = document.createElement("ul");
        children.sort((a, b) => a.sorthead - b.sorthead);
        children.forEach((child) => createNode(child, childList));
        newNode.appendChild(childList);
      }
      parentNode.appendChild(newNode);
    }

    parentNode.innerHTML = "";

    const rootNodes = services.filter((service) => service.head === null);
    rootNodes.forEach((root) => createNode(root, parentNode));
  }

  useEffect(() => {
    const page = document.getElementById("create-tree");
    if (servicesData) {
      createTree(page, servicesData);
    }
  }, [servicesData]);

  return <div className="create-tree" id="create-tree"></div>;
}

export default CreateTree;
