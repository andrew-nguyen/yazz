function(args) {
/*
is_app(true)
control_type("VB")
display_name("Vertical scrollbar control")
description("This will return the Vertical scrollbar control")
base_component_id("vert_scroll_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:     "text",
            name:   "Text",
            type:   "String"
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,
        {
            id:     "changed_event",
            name:   "Changed event",
            type:   "Event"
        }
        ]
)//properties
logo_url("/driver_icons/vert_scroll_bar.png")
*/

    Vue.component("vert_scroll_control",{
        props: ["args","refresh"]
        ,



        template:

`<div v-bind:style='"height:100%;width:100%; border: 0px;" +
                    "background-color: "+    args["background_color"]  +  ";"'>

    <input  type="range"
            v-on:change='changedFn();runEventHandler()'
            v-on:input='changedFn();runEventHandler()'
            v-model='value'
            min="1"
            max="100"
            value="50"
            step="1"
            v-bind:style='"position:absolute;transform: rotate(90deg);width: " + (args.height - 20) + ";top: " + ((args.height / 2) - 0) + "px;left: -" + ((args.height / 2) - 20) + "px;"'
            >

    </input>

</div>`
        ,




        data: function() {
            return {
                msg:               "...",
                value:             null
            }
        }
        ,
        watch: {
          refresh: function(newValue, oldValue) {
              if (isValidObject(this.args)) {
                  this.value = this.args.value
              }
          }
        }
        ,
        mounted: function() {
            if (isValidObject(this.args)) {
                this.items = this.args.items
                if (isValidObject(this.args.value)) {
                   this.value = this.args.value
                }
            }
        }
        ,
        methods: {
              changedFn: function() {
                  if (isValidObject(this.args)) {
                      this.args.value = this.value
                  }
              }
              ,

              runEventHandler: function() {
                  this.$emit('send', {
                                                  type:               "subcomponent_event",
                                                  control_name:        this.args.name,
                                                  sub_type:           "changed",
                                                  code:                this.args.changed_event
                                              })
              }
        }


    })
}
