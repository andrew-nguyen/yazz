{
    doc_type: 'visifile',
    name: 'appEditor',version: 1,



    events: {
        "This will return the editor app": {
            on: "app",
            do: function(args, returnfn) {
                is_app()

                var mm = new Vue({
                  el: "#" + args.root_element
                  ,
                  template: `<div>
                    Okhay this AppShare app editor
                        <component  is="editor_component" v-if="editor_loaded" > PLACEHOLDER </component>
                        Code ID: {{code_id}}
                  </div>
                   `
                   ,
                   data: {
                       editor_loaded: false,
                       code_id: "..."
                   }

                })

                //mm.code_id = args.code_id
                alert(JSON.stringify(args,null,2))

                callDriverMethod( "editorComponent",
                                  "component"
                                  ,{}
                            ,
                            function(result) {
                                //alert(JSON.stringify(result,null,2))
                              //  console.log("3) returned result: " + JSON.stringify(result,null,2))
                              //alert(result.name)
                                mm.editor_loaded = true
                            })


                //alert("root: " + args.root_element +".")
                returnfn(
                )


            }, end: null
        }

    }

}