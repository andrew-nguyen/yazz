function(args) {
/*
is_app(true)
control_type("VB")
display_name("3d item")
description("This will return the 3d item control")
base_component_id("threedee_item_control")
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
            id:         "position",
            name:       "Position",
            type:       "String",
            default:    "-1.2 2.5 -3"
        }
    ]
)//properties
logo_url("/driver_icons/threedee_item.png")
*/

    Vue.component("threedee_item_control",{
        props: ["args","design_mode", "refresh"]
        ,
      template: `<a-entity    geometry="primitive: box"
                              material="color: #166678; side: double"
                              physics-body="mass: 5; boundingBox: 2 2 2; shape: auto;"
                              dynamic-body
                              v-bind:position='args.position'>
                              <a-text position="1 0 0" v-bind:value='args.text'></a-text>
                    </a-entity>`
    })
}
