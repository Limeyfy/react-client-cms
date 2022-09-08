# File upload example

```tsx
import { ClientCms } from '@limeyfy/react-client-cms';
// Documentation on https://ant.design
import 'antd/dist/antd.css'; // I suggest putting this in root file
import { useState } from 'react';

const MyCoolComponent = () => {
    const [loading, setLoading] = useState();

    const handleSubmit = async (data: DataType) => {
        setLoading(true);
        // do something amazing!!
        setLoading(false);
    };

    function beforeUpload(file: File): boolean {
        if (file.size > 1024 * 1024) {
            alert('File size too large');
            return false;
        }
        return true;
    }

    function initFiles() {
        return project.images.map((i) => ({
            uid: i,
            name: i,
            status: 'done',
            url: i,
        }));
    }

    return (
        <ClientCms
            onSubmit={handleSubmit}
            loading={loading}
            fields={[
                {
                    name: 'images',
                    type: {
                        type: 'upload',
                        props: {
                            maxCount: 5,
                            accept: 'image/*',
                            multiple: true,
                            beforeUpload,
                        },
                        initValue: initFiles(),
                    },
                },
            ]}
        />
    );
};
```
