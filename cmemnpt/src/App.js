import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const SERVER = 'https://api-mnpt-cme.vercel.app/api/v1';
// const SERVER = 'http://localhost:5001/api/v1';

function App() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    // const [invoices, setInvoices] = useState();
    // const [accounts, setAccounts] = useState();
    // const [totalInMonth, setTotalInMonth] = useState([]);
    const [pw, setPw] = useState();

    const [month, setMonth] = useState(params.month ? parseInt(params.month) : new Date().getMonth() + 1);
    const [year, setYear] = useState(params.year ? parseInt(params.year) : new Date().getFullYear());

    const getInvoices = useQuery({
        queryKey: ['invoices'],
        queryFn: () => {
            // const month = new Date().getMonth() + 1;
            // const year = new Date().getFullYear();
            const controller = new AbortController();
            setTimeout(() => {
                controller.abort();
            }, 5000);
            return axios.get(`${SERVER}/invoice/month/${month}/year/${year}`);
        },
        onSuccess: () => {
            // setInvoices(res.data.data);
            // setAccounts(res.data.accounts);
            // setTotalInMonth(res.data.totalInMonth)
        },
        keepPreviousData: false,
        retry: 0
    });

    const handleDelete = (invoiceId) => {
        const res = axios.delete(`${SERVER}/invoice/${invoiceId}`);
        window.location.reload();
    };

    useEffect(() => {
        const callAPI = async () => {
            // const month = new Date().getMonth() + 2;
            // const year = new Date().getFullYear();
            // const res = await axios.get(`${SERVER}/invoice/month/${month}/year/${year}`)
            // setInvoices(res.data.data);
            // setAccounts(res.data.accounts);
            // setTotalInMonth(res.data.totalInMonth)
            // console.log(res.data)
        };
        callAPI();
    }, []);

    console.log({getInvoices});
    const clearAll = async () => {
        if (pw != 10052008) return;
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Opera, the true version is after "Opera" or after "Version"
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browserName = 'Opera';
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browserName = 'Microsoft Internet Explorer';
            fullVersion = nAgt.substring(verOffset + 5);
        }
        // In Chrome, the true version is after "Chrome"
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browserName = 'Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // In Safari, the true version is after "Safari" or after "Version"
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browserName = 'Safari';
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
        }
        // In Firefox, the true version is after "Firefox"
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browserName = 'Firefox';
            fullVersion = nAgt.substring(verOffset + 8);
        }
        // In most other browsers, "name/version" is at the end of userAgent
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(';')) != -1) fullVersion = fullVersion.substring(0, ix);
        if ((ix = fullVersion.indexOf(' ')) != -1) fullVersion = fullVersion.substring(0, ix);

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        const dataBrowser = '' + 'Browser name  = ' + browserName + '<br>' + 'Full version  = ' + fullVersion + '<br>' + 'Major version = ' + majorVersion + '<br>' + 'navigator.appName = ' + navigator.appName + '<br>' + 'navigator.userAgent = ' + navigator.userAgent + '<br>';

        var OSName = 'Unknown OS';
        if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
        if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS';
        if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX';
        if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux';

        const dataOS = OSName;

        const res = await axios.post(`${SERVER}/invoice/deleteAll`, {
            dataBrowser,
            dataOS
        });
        window.location.reload();
    };
    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: 'aliceblue',
                position: 'relative'
            }}
        >
            <button
                onClick={() => {
                    window.location.assign(`/?month=${month > 1 ? month - 1 : 12}&year=${month > 1 ? year : year - 1}`);
                }}
                style={{position: 'absolute', top: '40px', left: '40px'}}
                className="btn btn-info"
            >
                PREVIOUS MONTH
            </button>
            <button
                onClick={() => {
                    window.location.assign(`/`);
                }}
                style={{
                    position: 'absolute',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
                className="btn btn-info"
            >
                CURRENT MONTH
            </button>
            <button
                onClick={() => {
                    window.location.assign(`/?month=${month < 12 ? month + 1 : 1}&year=${month < 12 ? year : year + 1}`);
                }}
                style={{position: 'absolute', top: '40px', right: '40px'}}
                className="btn btn-info"
            >
                NEXT MONTH
            </button>
            <div
                style={{
                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                    padding: '20px',
                    backgroundColor: 'white'
                }}
            >
                <h2 style={{textAlign: 'center', marginTop: '100px'}}>ROOM MONEY NOTE</h2>
                <div style={{textAlign: 'center', margin: '20px'}}>
                    <i>MONTH:</i> <strong>{month}</strong> <i>YEAR:</i> <strong>{year}</strong>
                </div>
                <div
                    style={{
                        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                        width: 'fit-content',
                        margin: 'auto'
                    }}
                >
                    <table className="table" style={{maxWidth: '1000px', margin: 'auto'}}>
                        <thead style={{backgroundColor: '#ddd'}}>
                            <tr>
                                {getInvoices.data?.data.accounts.map((acc) => (
                                    <th key={acc.id} scope="col" width="200px">
                                        {acc.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {!getInvoices.isLoading && getInvoices.data?.data && (
                                <tr>
                                    {getInvoices.data?.data.accounts.map((acc) => (
                                        <td key={acc.id}>{`${getInvoices.data?.data.totalInMonth[`${acc.id}`]}.000`}</td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {month === new Date().getMonth() + 1 && year === new Date().getFullYear() && <NewInvoice accounts={getInvoices.data?.data.accounts}></NewInvoice>}
                <div
                    style={{
                        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                        margin: 'auto',
                        borderRadius: '5px',
                        marginTop: '20px'
                    }}
                >
                    <table className="table table-hover">
                        <thead style={{backgroundColor: '#ddd'}}>
                            <tr>
                                <th scope="col">#</th>
                                {getInvoices.data?.data.accounts.map((acc) => (
                                    <th key={acc.id} scope="col">
                                        {acc.name}
                                    </th>
                                ))}
                                <th scope="col">Total</th>
                                <th scope="col" className="hidden-mobile">
                                    Purpose
                                </th>
                                <th scope="col" className="hidden-mobile">
                                    Timestamp
                                </th>
                                <th scope="col" className="hidden-mobile">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!getInvoices.isLoading &&
                                getInvoices.data?.data.data &&
                                getInvoices.data?.data.data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            {getInvoices.data?.data.accounts.map((acc) => (
                                                <td
                                                    key={acc.id}
                                                    style={{
                                                        background: item.payer == `${acc.id}` ? '#2596be' : 'none'
                                                    }}
                                                >
                                                    {item.receiver[`${acc.id}`]}
                                                </td>
                                            ))}
                                            <td style={{fontWeight: 'bold'}}>{item.total}</td>
                                            <td style={{maxWidth: '100px', overflowWrap: 'anywhere'}} className="hidden-mobile">
                                                {item.purpose}
                                            </td>
                                            <td className="hidden-mobile">{`${item.day}/${item.month}/${item.year}`}</td>
                                            <td className="hidden-mobile">
                                                <span
                                                    style={{cursor: 'pointer', color: 'red'}}
                                                    onClick={() => {
                                                        handleDelete(item.id);
                                                    }}
                                                >
                                                    Delete
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const isAll = (receivers) => {
    return receivers.includes('MNPT000') && receivers.includes('MNPT001') && receivers.includes('MNPT002') && receivers.includes('MNPT003');
};

const handleNewUser = () => {
    alert('Feature not available');
};

const NewInvoice = ({accounts}) => {
    const queryClient = useQueryClient();
    const [payer, setPayer] = useState();
    const [receiver, setReceiver] = useState([]);
    const [total, setTotal] = useState('');
    const [purpose, setPurpose] = useState('');
    const handleAddReceiver = (id) => {
        if (id == 'all') {
            const l = ['MNPT000', 'MNPT001', 'MNPT002', 'MNPT003'];
            if (receiver.length == 0) {
                setReceiver(l);
            } else {
                setReceiver([]);
            }
            return;
        }
        let r = JSON.parse(JSON.stringify(receiver));
        if (r.includes(id)) {
            const index = r.indexOf(id);
            if (index > -1) {
                // only splice array when item is found
                r.splice(index, 1); // 2nd parameter means remove one item only
            }
        } else {
            r.push(id);
        }
        setReceiver(r);
    };

    const handleAdd = async () => {
        // if(!payer || !receiver || !total) {
        //   console.log('Missing arrguments: ', {payer, receiver, total, purpose});
        //   return;
        // }
        // const res = await axios.post(`${SERVER}/invoice`, {
        //   payer, receiver, total, purpose
        // })
        // console.log(res.data)
        // window.location.reload();
        addInvoice.mutate();
    };

    const addInvoice = useMutation({
        mutationFn: () => {
            if (!payer || !receiver || !total) {
                console.log('Missing arrguments: ', {
                    payer,
                    receiver,
                    total,
                    purpose
                });
                return;
            }
            console.log({
                payer,
                receiver,
                total,
                purpose
            });
            return axios.post(`${SERVER}/invoice`, {
                payer,
                receiver,
                total,
                purpose
            });
        },
        onSuccess: (data) => {
            console.log({data});
            setPayer((prev) => '');
            setReceiver((prev) => []);
            setTotal((prev) => '');
            setPurpose((prev) => '');
            queryClient.invalidateQueries({queryKey: ['invoices']});
        }
    });

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '20px'
                }}
            >
                <h4 style={{margin: '20px'}}>PAYER: {payer}</h4>
                <div>
                    {accounts &&
                        accounts.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    className={'btn-payer mr-1 my-2 ' + (payer == item.id ? 'active' : '')}
                                    onClick={() => {
                                        setPayer(item.id);
                                    }}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                </div>
                <h4 style={{margin: '20px'}}>USER:</h4>
                <div>
                    <button type="button" className={'btn-receiver mr-1 my-2 ' + (isAll(receiver) ? 'active' : '')} onClick={() => handleAddReceiver('all')}>
                        ALL
                    </button>
                    {accounts &&
                        accounts.map((item, index) => {
                            return (
                                <button key={index} type="button" className={'btn-receiver mr-1 my-2 ' + (receiver.includes(item.id) ? 'active' : '')} onClick={() => handleAddReceiver(item.id)}>
                                    {item.name}
                                </button>
                            );
                        })}
                    <button type="button" className={'btn-add-user mr-1 my-2'} onClick={() => handleNewUser()}>
                        New User
                    </button>
                </div>
                <h4 style={{margin: '20px'}}>MONEY: </h4>
                <div className="input-group w-50">
                    <input
                        type="number"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                        onChange={(e) => {
                            setTotal(e.target.value);
                        }}
                        value={total}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">000</span>
                        <span className="input-group-text">VND</span>
                    </div>
                </div>
                <h4 style={{margin: '20px'}}>PURPOSE: </h4>
                <div className="input-group w-50">
                    <input type="text" className="form-control" onChange={(e) => setPurpose(e.target.value)} value={purpose} />
                </div>
                <button type="button" className="btn btn-outline-primary mr-1 my-2" onClick={handleAdd}>
                    Add new record
                </button>
            </div>
        </>
    );
};

const Button = ({content, type}) => {
    return type == 'primary' ? (
        <button type="button" className="mr-1 my-2">
            {content}
        </button>
    ) : (
        <button type="button" className="mr-1 my-2">
            {content}
        </button>
    );
};

export default App;
