(ns webapp.framework.client.protocols
  (:use
   [webapp.framework.client.records :only  [NeoNode]]
   )
  )


(defprotocol INeoNode
  (setProp [this property value])
)


(extend-type NeoNode
  INeoNode
  (setProp [this property value] (assoc this property value))
)
