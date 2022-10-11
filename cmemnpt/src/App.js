import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {  
  const [invoices, setInvoices] = useState();
  const [accounts, setAccounts] = useState();
  const [totalInMonth, setTotalInMonth] = useState();
  const [pw, setPw] = useState();
  useEffect(() =>{
    const callAPI = async () => {
      const month = new Date().getMonth() + 1;
      const res = await axios.get(`${'http://localhost:5000/api/v1'}/invoice/month/${month}`)
      setInvoices(res.data.data);
      setAccounts(res.data.accounts);
      setTotalInMonth(res.data.totalInMonth)
      console.log(res.data)
    }
    callAPI();
  }, [])

  const clearAll = async () => {
    if(pw != 10052008) return;
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion); 
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset+6);
    if ((verOffset=nAgt.indexOf("Version"))!=-1) 
      fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset+7);
    if ((verOffset=nAgt.indexOf("Version"))!=-1) 
      fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
              (verOffset=nAgt.lastIndexOf('/')) ) 
    {
    browserName = nAgt.substring(nameOffset,verOffset);
    fullVersion = nAgt.substring(verOffset+1);
    if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
      fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
      fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
    fullVersion  = ''+parseFloat(navigator.appVersion); 
    majorVersion = parseInt(navigator.appVersion,10);
    }

    const dataBrowser = ''
    +'Browser name  = '+browserName+'<br>'
    +'Full version  = '+fullVersion+'<br>'
    +'Major version = '+majorVersion+'<br>'
    +'navigator.appName = '+navigator.appName+'<br>'
    +'navigator.userAgent = '+navigator.userAgent+'<br>'

    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

    const dataOS = OSName;

    const res = await axios.post(`${'http://localhost:5000/api/v1'}/invoice/deleteAll`, {dataBrowser, dataOS})
    console.log(res.data)
    window.location.reload();
  }
  return (
    <div>
      <h2 style={{textAlign: 'center'}} className="my-5">Tinh Tien Thui Nha</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Danh</th>
            <th scope="col">Dang</th>
            <th scope="col">Viet</th>
            <th scope="col">Thinh</th>
            <th scope="col">Bao</th>
          </tr>
        </thead>
        <tbody>
          {totalInMonth && <tr>
            <td>{`${totalInMonth['MNPT000']}.000`}</td>
            <td>{`${totalInMonth['MNPT001']}.000`}</td>
            <td>{`${totalInMonth['MNPT002']}.000`}</td>
            <td>{`${totalInMonth['MNPT003']}.000`}</td>
            <td>{`${totalInMonth['MNPT004']}.000`}</td>
            </tr>}
        </tbody>
      </table>
      <NewInvoice accounts={accounts}></NewInvoice>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Danh</th>
            <th scope="col">Dang</th>
            <th scope="col">Viet</th>
            <th scope="col">Thinh</th>
            <th scope="col">Bao</th>
            <th scope="col">Total</th>
            <th scope="col" className="hidden-mobile">Purpose</th>
            <th scope="col" className="hidden-mobile">Timestamp</th>
            <th scope="col" className="hidden-mobile">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices && invoices.map((item, index) => {
            return <tr key={index}>
              <th scope="row">{index+1}</th>
              <td style={{ background: item.payer == 'MNPT000' ? "#2596be" : "none"}}>{item.receiver['MNPT000']}</td>
              <td style={{ background: item.payer == 'MNPT001' ? "#2596be" : "none"}}>{item.receiver['MNPT001']}</td>
              <td style={{ background: item.payer == 'MNPT002' ? "#2596be" : "none"}}>{item.receiver['MNPT002']}</td>
              <td style={{ background: item.payer == 'MNPT003' ? "#2596be" : "none"}}>{item.receiver['MNPT003']}</td>
              <td style={{ background: item.payer == 'MNPT004' ? "#2596be" : "none"}}>{item.receiver['MNPT004']}</td>
              <td style={{fontWeight: 'bold'}}>{item.total}</td>
              <td style={{maxWidth: '100px', overflowWrap: 'anywhere'}} className="hidden-mobile">{item.purpose}</td>
              <td className="hidden-mobile">{`${item.day}/${item.month}/${item.year}`}</td>
              <td style={{cursor: 'pointer'}} className="hidden-mobile">D</td>
            </tr>
          })}
        </tbody>
      </table>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Xoa het - Du Thien
      </button>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Nhap Mat Khau</h4>
              <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={e => setPw(e.target.value)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={clearAll}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}


const NewInvoice = ({accounts}) => {
  const [payer, setPayer] = useState();
  const [receiver, setReceiver] = useState([]);
  const [total, setTotal] = useState();
  const [purpose, setPurpose] = useState('');
  const handleAddReceiver= (id) => {
    let r = JSON.parse(JSON.stringify(receiver));
    if(r.includes(id)){
      const index = r.indexOf(id);
      if (index > -1) { // only splice array when item is found
        r.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      r.push(id)
    }
    setReceiver(r)
  }

  const handleAdd = async () => {
    if(!payer || !receiver || !total) {
      console.log('Missing arrguments: ', {payer, receiver, total, purpose});
      return;
    }
    const res = await axios.post(`${'http://localhost:5000/api/v1'}/invoice`, {
      payer, receiver, total, purpose
    })
    console.log(res.data)
    window.location.reload();
  }
  return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px'}}>
    <h4 style={{margin: '20px'}}>Nguoi chi: {payer}</h4>
    <div>
    {accounts && accounts.map((item, index) => {
      return  <button key={index} type="button" className={"btn-payer mr-1 my-2 " + (payer == item.id ? "active" : "")} onClick={() => {setPayer(item.id)}}>{item.name}</button>      
    })}
    </div>
    <h4 style={{margin: '20px'}}>Nguoi nhan:</h4>
    <div>
    {accounts && accounts.map((item, index) => {
      return  <button key={index} type="button" className={"btn-receiver mr-1 my-2 " + (receiver.includes(item.id) ? "active" : "")} onClick={() => handleAddReceiver(item.id)}>{item.name}</button>      
    })}
    </div>
    <h4 style={{margin: '20px'}}>So tien</h4>
    <div className="input-group w-50">
      <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" defaultValue={total} onChange={(e) => {setTotal(e.target.value)}}/>
      <div className="input-group-append">
        <span className="input-group-text">000</span>
        <span className="input-group-text">VND</span>
      </div>
    </div>
    <h4 style={{margin: '20px'}}>Ly do</h4>
    <div className="input-group w-50">
      <input className="form-control" defaultValue={purpose} onChange={(e) => setPurpose(e.target.value)}/>
    </div>
    <button type="button" className="btn btn-outline-primary mr-1 my-2" onClick={handleAdd}>Them moi</button>
  </div>
}

const Button = ({content, type}) => {
  return type == 'primary' ? <button type="button" className="mr-1 my-2">{content}</button> : <button type="button" className="mr-1 my-2">{content}</button>
}

export default App;
