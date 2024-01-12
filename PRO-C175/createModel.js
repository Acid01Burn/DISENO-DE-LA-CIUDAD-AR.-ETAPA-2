AFRAME.registerComponent("createmodels", {
    init: async function(){
        var models = await this.getModels();
        var barcodes = Object.keys(models);
        barcodes.map(barcode => {
            var model = models[barcode];
            this.createModel(model);
        });
    },

    getModel: function(){
        return fetch("models.json")
            .then(res => res.json())
            .then(data => data);
    },
    
    createModel: function(model) {
        var barcodeValue = model.barcode_value;
        var modelUrl = model.model_url;
        var modelName = model.model_name;

        var scene = document.querySelector("a-scene");

        var market = document.createElement("a-market");

        market.setAttribute("id", `market-${modelName}`);
        market.setAttribute("type", "barcode");
        market.setAttribute("model_name", modelName);
        market.setAttribute("value", barcodeValue);
        market.setAttribute("markerhandler", {});
        scene.appendChild(market);

        if(barcodeValue === 0){
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id", `${modelName}`);
            modelEl.setAttribute("geometry", {
                primitive: "box",
                width: model.width,
                height: model.height
            });
            modelEl.setAttribute("position", model.position);
            modelEl.setAttribute("rotation", model.rotation);
            modelEl.setAttribute("material" , {
                color: model.color
            });
            market.appendChild(modelEl);
        } else {
            var modelEl = document.createElement("a-entity");
            modelEl.setAttribute("id", `${modelName}`);
            modelEl.setAttribute("gltf-model", `url(${modelUrl})`);
            modelEl.setAttribute("scale", model.scale);
            modelEl.setAttribute("position", model.position);
            modelEl.setAttribute("rotation", model.rotation);
            market.appendChild(modelEl);
        }
    }
});