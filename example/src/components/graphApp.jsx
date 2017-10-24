import Graph from "react-graph-vis";
// import Graph from "../../lib";

// import Graph from 'react-graph-vis'

import vis from "vis";
import React from "react";
import { render } from "react-dom";

//var node_data = [];

class GraphApp extends Graph {

  getFromApi () {
    var self = this;
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
             console.log(json);
             try {
               //self.nodes = new vis.DataSet();
               //self.nodes.add({ id: json.nodes[0].id, label: json.nodes[0].label });
             }
             catch(err) {
               console.log(err.message);
             }
             //, edges: self.edges });
             //state.forceUpdate();
         })
      .catch(function(error) {
             console.log("in getFromApi() of App component")
             console.log(error.message);
      });
  }

  constructor(props) {
      super(props);

      this.nodes = [];
      this.edges = [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }];

      this.options = {
        layout: {
          hierarchical: false
        },
        edges: {
          color: "#000000"
        }
      };

      this.events = {
        select: function(event) {
          var { nodes, edges } = event;
          console.log("Selected nodes:");
          console.log(nodes);
          console.log("Selected edges:");
          console.log(edges);
        }
      };
      /*
      */

      //this.getFromApi();
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

          <Graph graph={this} options={this.options} events={this.events} style={{ height: "100%" }} />
        </div>
      //document.getElementById("root")
    );
  }
}

export default GraphApp;
