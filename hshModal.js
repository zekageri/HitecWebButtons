
let hshModal = {
    init: function() {
        this.events();
    },
    events: function() {
        this.modalOpenerEvent();
        this.modalCloserEvent();
        this.modalWrapperCloserEvent();
    },
    modalOpenerEvent: function(){
        let modalOpener = qsa(".modalOpener");
        for (let i = 0; i < modalOpener.length; i++) {
            modalOpener[i].addEventListener('click', function(e) {
                e.preventDefault();
                let modalId = this.getAttribute('data-modal');
                hshModal.openModal(modalId);
            });
        }
    },
    modalCloserEvent: function(){
        let modalCloser = qsa(".modalCloser");
        for (let i = 0; i < modalCloser.length; i++) {
            modalCloser[i].addEventListener('click', function(e) {
                e.preventDefault();
                let modalId = this.getAttribute('data-modal');
                hshModal.closeModal(modalId);
            });
        }
    },
    modalWrapperCloserEvent: function(){
        let hshModalWrapper = qsa(".hshModalWrapper");
        for (let i = 0; i < hshModalWrapper.length; i++) {
            hshModalWrapper[i].addEventListener('click', function(e) {
                let targetClassList = e.target.classList;
                if( targetClassList.contains('hshModalWrapper') ){
                    let modalId = this.getAttribute('id');
                    hshModal.closeModal(modalId);
                }
            });
        }
    },
    openModal: function(modalId) {
        let modal = document.getElementById(modalId);
        modal.classList.add('visible');
    },
    closeModal: function(modalId) {
        let modal = document.getElementById(modalId);
        modal.classList.remove('visible');
    }
};