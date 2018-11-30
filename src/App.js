import React, { Component } from "react";
import Graph from "react-graph-vis";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      nodes: [],
      edges: [],
      tam: 0
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    console.log("openModal()");
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const graph = {
      nodes: this.state.nodes,
      edges: this.state.edges
    };

    const options = {
      clickToUse: true,
      locale: "pt-br",
      edges: {
        color: "#000000",
        arrows: {
          to: { enabled: false, scaleFactor: 1, type: "arrow" }
        }
      },
      nodes: {
        shape: "circle"
      },
      interaction: {
        dragView: false,
        zoomView: false
      },
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: (nodeData, callback) => {
          nodeData.label = this.state.nodes.length.toString();
          nodeData.physics = false;
          callback(null);
          this.setState({
            nodes: [...this.state.nodes, nodeData]
          });
          console.log(nodeData);
        },
        addEdge: (edgeData, callback) => {
          edgeData.label = this.state.edges.length.toString();
          // edgeData.arrows = false;
          callback(null);
          this.setState({
            edges: [...this.state.edges, edgeData]
          });
          console.log(edgeData);
        },
        // editNode: (nodeData,callback) => {
        //   nodeData.label = 'Node 2';
        //   callback(nodeData);
        // },
        editEdge: true,
        deleteNode: (nodeData, callback) => {
          callback(nodeData);
          console.log(nodeData);
        },
        deleteEdge: true,
        controlNodeStyle: {
          // all node options are valid.
        }
      }
    };

    const events = {
      // select: function(event) {
      //     var { nodes, edges } = event;
      //     console.log("select");
      // },
      //   click: function(event) {
      //     var { nodes, edges } = event;
      //     console.log("nodes: "+event.nodes);
      //     console.log("edges: "+event.edges);
      //     console.log("x: "+event.pointer.DOM.x);
      //     console.log("y: "+event.pointer.DOM.y);
      //     console.log("x: "+event.pointer.canvas.x);
      //     console.log("y: "+event.pointer.canvas.y);
      // }
      selectNode: evt => {
        let { nodes, edges } = evt;
        console.log(nodes);
        console.log(edges);
      },
      doubleClick: evt => {
        let { nodes, edges } = evt;
        if (edges.length != 0) {
          console.log(edges[0]);
          this.openModal();
          // let arr = this.state.edges;
          // for (var i = 0; i < this.state.edges.length; i++) {
          //   if (arr[i].id === edges[0]) {
          //     console.log(arr[i].id);
          //     arr[i].label = 0;
          //   }
          // }
          // this.setState({ edges: arr });
        }
      }
    };

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal}>Cancelar</button>
          <div>Insira o peso</div>
          <input />
          <button>Ok</button>
        </Modal>
        <Graph height={800} graph={graph} options={options} events={events} />
      </div>
    );
  }
}

export default App;
