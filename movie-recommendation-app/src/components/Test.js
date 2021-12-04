import { useState, useEffect } from 'react';

const Test = () => {
    // const [currentTime, setCurrentTime] = useState(0);
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        fetch('/test').then(res => res.json()).then(data => {
            setDetail(data);
        });
    }, []);
    return (
        <div>
            <div>The current detail is {detail.map(d => {
                return (
                    <div key={d.id}>
                        <p>{d.id}</p>
                        <p>{d.title}</p>
                        <p>{d.media_type}</p>
                    </div>
                );
            })}.
            </div>
        </div>
    )
}

export default Test
