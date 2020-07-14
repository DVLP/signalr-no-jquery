const {ajax} = require('../src/jQueryShim');

let open, send, status, onload, setRequestHeader, response;
function createXHRmock() {
    open = jest.fn();
    status = 200;
    response =''

    send = jest.fn().mockImplementation(function(){});

    setRequestHeader = jest.fn().mockImplementation(function(a, b){})

    const xhrMockClass = function () {
        return {
            open,
            send,
            status,
            setRequestHeader,
            response
        };
    };

    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
}

const cases = [{url: 'test?_=0', name: 'with only cacheBuster query', request: 'test?_=1'}, 
   {url: 'test', name: 'with just URL', request: 'test?_=1'}, 
    {url: 'test?dummy=d', name: 'with existing query', request: 'test?dummy=d&_=1'}, 
{url: 'test?dummy=d&_=0', name: 'with query and cachebuster', request: 'test?dummy=d&_=1'}]
cases.forEach(t => 
    test(`Test that cacheBuster works ${t.name}`, () => {
        spyOn(Date.prototype, 'getTime').and.returnValue(1);
    createXHRmock();
    const options = {url: t.url, xhrFields: {withCredentials: true}, data: {data: {}}, type: "GET"}
    
    ajax(options)

    expect(open).toBeCalledWith('GET', t.request);
    
})
    );