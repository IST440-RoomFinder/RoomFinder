function submit(){
    console.log("HERE sdgdsffs")
    let startSelect = document.getElementById('startpoint')
    let endSelect = document.getElementById('endpoint')

    let valueStart = startSelect.options[startSelect.selectedIndex].value;
    let valueEnd = endSelect.options[endSelect.selectedIndex].value;

    console.log(valueStart)
    document.getElementById('startSubmit').value = valueStart
    document.getElementById('endSubmit').value = valueEnd

    document.formRoute.submit()
}