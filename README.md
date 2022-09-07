# React-Client-Cms

!Note that you for now need ant.design css to run this.

`npm i --save antd` or `yarn add antd`

Just import it like this

`import "antd/dist/antd.css";` 


## Installation

```
yarn add @limeyfy/react-client-cms
or
npm i --save @limeyfy/react-client-cms
```

## Example
```tsx
import { ClientCms } from '@limeyfy/react-client-cms';
// Documentation on https://ant.design
import "antd/dist/antd.css" // I suggest putting this in root file
import { useState } from "react"

const MyCoolComponent = () => {
  const [loading, setLoading] = useState();

  const handleSubmit = async (data: DataType) => {
    setLoading(true);
    // do something amazing!!
    setLoading(false)
  }

  return (
    <ClientCms
      onSubmit={handleSubmit}
      loading={loading}
      fields={[
        {
          name: 'name', 
          label: 'Name', 
          type: {
            type: 'string',
            props: {
              /* here you can pass props. Look at ant.design to see the possibilities */ 
            }
          },
        },
        {/* ...values */}
      ]}
    />
  )
}

```

![Example of code](/docs/imgs/Example.png)
Voila!