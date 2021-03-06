function(args) {
/*
is_app(true)
control_type("VB")
display_name("Drive list control")
description("This will return the drive list control")
base_component_id("drive_list_control")
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
logo_url("/driver_icons/drive_list.png")
*/

    Vue.component("drive_list_control",{
      props: ["args","design_mode"]
      ,
      template: `<div v-bind:style='"height:100%;width:100%; border: 0px;" +
                                    "background-color: "+    args["background_color"]  +  ";"'>

                                    <select
                                        v-on:change='changedFn();runEventHandler()'
                                        v-model='value'>

                                        <option v-for='opt in drives'
                                                v-bind:value='opt.drive'>
                                            {{opt.drive}}
                                        </option>

                                    </select>

                 </div>`
      ,
      data: function() {
         return {
            value: null,
             drives: []
         }
      }
      ,
      mounted: async function() {
        if (!this.design_mode) {
            var result = await callFunction(
                                {
                                    driver_name: "serverDriveList",
                                    method_name: "serverDriveList"  }
                                    ,{ })

           if (result.value) {
                this.drives = result.value

           }
           if (isValidObject(this.args)) {
               this.items = this.args.items
               if (isValidObject(this.args.value)) {
                  this.value = this.args.value
               }
           }

           }
       }
        ,
        watch: {
          // This would be called anytime the value of the input changes
          refresh: function(newValue, oldValue) {
              //console.log("refresh: " + this.args.text)
              if (isValidObject(this.args)) {
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
