import React from 'react';
import { render } from 'react-dom';
//import GraphApp from './components/graphApp.jsx';

import vis from "vis";
import Graph from "react-graph-vis";
//.props.graph.edges

var initalGraphObject = {
  nodes: [
    { id: 1, label: "Node 1", color: "#e04141" },
    { id: 2, label: "Node 2", color: "#e09c41" },
    { id: 3, label: "Node 3", color: "#e0df41" },
    { id: 4, label: "Node 4", color: "#7be041" },
    { id: 5, label: "Node 5", color: "#41e0c9" }
  ],
  edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }]
};

class LiveGraph extends React.Component {
  constructor({initialGraph}) {
    super();
    this.state = {
      graph: initialGraph,
      options: {
        layout: {
          hierarchical: false
        },
        edges: {
          color: "#000000"
        }
      },
      events: {
        select: function(event) {
          var { nodes, edges } = event;
          console.log("Selected nodes:");
          console.log(nodes);
          console.log("Selected edges:");
          console.log(edges);
        }
      }
    };
  }

  componentDidMount() {
    const { graph } = this.state;
    const nodes = Array.from(graph.nodes);

    fetch('/static/data.json', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(response) {
            if (response.ok) {
                return response.json();
            }
         })
      .then(function(json) {
             //console.log("in componentDidMount() : " + JSON.stringify(json));
             //console.log(json);
             this.setState({ graph : json });
         }.bind(this))
      .catch(function(error) {
             console.log("in componentDidMount() of App component")
             console.log(error.message);
      });
  }

  render() {
    return (
      <div>
          <h1>React graph vis</h1>
          <p>
            <a href="https://github.com/crubier/react-graph-vis">Github</a> -{" "}
            <a href="https://www.npmjs.com/package/react-graph-vis">NPM</a>
          </p>
          <p>
            <a href="https://github.com/crubier/react-graph-vis/tree/master/example">Source of this page</a>
          </p>
          <p>A React component to display beautiful network graphs using vis.js</p>
          <p>
            Make sure to visit <a href="http://visjs.org">visjs.org</a> for more info.
          </p>
          <p>This package allows to render network graphs using vis.js.</p>
          <p>Rendered graphs are scrollable, zoomable, retina ready, dynamic, and switch layout on double click.</p>

          <Graph graph={this.state.graph} options={this.state.options} events={this.state.events} style={{ height: "640px" }} />
        </div>
    );
  }
}

render(
  <LiveGraph initialGraph={initalGraphObject} />,
  document.getElementById('root')
);
