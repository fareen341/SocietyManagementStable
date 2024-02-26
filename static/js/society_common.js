
$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);


    // $(".next").click(function (e) {
    $("#nextBtn, #nextBtn2, #nextBtn3, #redirectToShares, #hLoan, #redirectToGst, #addGstNext").click(function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        e.stopPropagation();

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(++current);
    });

    // $(document).on("click", ".next", function (e) {
    //     e.preventDefault();
    //     current_fs = $(this).parent();
    //     previous_fs = $(this).parent().prev();

    //     //Remove class active
    //     $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //     //show the previous fieldset
    //     previous_fs.show();

    //     //hide the current fieldset with style
    //     current_fs.animate({ opacity: 0 }, {
    //         step: function (now) {
    //             // for making fielset appear animation
    //             opacity = 1 - now;

    //             current_fs.css({
    //                 'display': 'none',
    //                 'position': 'relative'
    //             });
    //             previous_fs.css({ 'opacity': opacity });
    //         },
    //         duration: 500
    //     });
    //     setProgressBar(--current);
    // });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }
});


// preview file for every file input
function PreviewImage(doc) {
    var doc = doc;
    pdffile = document.getElementById(`${doc}`).files[0];
    pdffile_url = URL.createObjectURL(pdffile);
    $('#viewer').attr('src', pdffile_url);
    window.open(pdffile_url);
}




// SOCIETY CREATION VUE
new Vue({
    el: '#addSociety',
    data: {
        formData: {
            society_name: '',
            admin_email: '',
            alternate_email: '',
            admin_mobile_number: '',
            alternate_mobile_number: '',
            registration_number: '',
            pan_number: '',
            gst_number: '',
            interest: '',
            society_reg_address: '',
            society_city: '',
            socity_state: '',
            pin_code: '',
            society_corr_reg_address: '',
            society_corr_city: '',
            socity_corr_state: '',
            pin_corr_code: '',
        },
        submitted: false,
        error: null,
        errors: {},
    },
    methods: {
        addSocietyForm() {
            // const formData = new FormData();
            // this.errors = {};
            // for (const key in this.formData) {
            //     if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
            //         if (this.formData[key] !== null) {
            //             formData.append(key, this.formData[key]);
            //         }
            //     }
            // }
            // if (this.$refs.registration_doc.files[0]) {
            //     this.formData.registration_doc = this.$refs.registration_doc.files[0]
            // }
            // if (this.$refs.pan_number_doc.files[0]) {
            //     this.formData.pan_number_doc = this.$refs.pan_number_doc.files[0]
            // }
            // if (this.$refs.gst_number_doc.files[0]) {
            //     this.formData.gst_number_doc = this.$refs.gst_number_doc.files[0];
            // }
            // console.log("formdata", this.formData);
            // axios.defaults.xsrfCookieName = 'csrftoken';
            // axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            // axios.post('http://127.0.0.1:8000/api/society-creation/', this.formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            //     .then(response => {
            //         this.submitted = true;
            //         // stopNext = true;
            //         this.nextAction();
            //     })
            //     .catch(error => {
            //         this.errors = error.response.data;
            //     });
            $("#nextBtn").trigger("click");
        },
        nextAction() {
            // Your logic for the next action after form submission
            console.log('Form data submitted successfully. Proceeding to the next action.');

            // Trigger the click event for ".next" button
            $("#nextBtn").trigger("click");
        },
        clearErrors() {
            this.errors = {};
        },
    },
});


// Bank
new Vue({
    el: '#bankContainer',
    data: {
        forms: [
            {
                beneficiary_code: '',
                beneficiary_name: '',
                beneficiary_acc_number: '',
                beneficiary_bank: '',
                is_primary: false
            }
        ],
        errors: [],
        singlePrimaryError: '',
    },
    methods: {
        addForm() {
            // axios.get('http://127.0.0.1:8000/api/getjson/', this.forms, {})
            //     .then(response => {
            //         console.log('Form:', response.data);
            //     })
            //     .catch(errors => {
            //         console.error('Error submitting form data:', errors);
            //         // this.errors = errors.response.data.errors;
            //     });
            this.forms.push({
                // society_creation: 49,
                beneficiary_code: '',
                beneficiary_name: '',
                beneficiary_acc_number: '',
                beneficiary_bank: '',
                is_primary: false
            });
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        submitBank() {
            // const primaryChecked = this.forms.some(form => form.is_primary);
            // if (!primaryChecked) {
            //     console.log("Bank Container");
            //     this.singlePrimaryError = "Please select at least one beneficiary as primary."
            //     return; // Stop further processing if validation fails
            // }else{
            //     this.singlePrimaryError = "";
            // }

            // axios.defaults.xsrfCookieName = 'csrftoken';
            // axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            // axios.post('http://127.0.0.1:8000/api/society_bank/', this.forms, {})
            //     .then(response => {
            //         console.log('Form data submitted successfully:', response.data);
            //         this.nextAction();
            //     })
            //     .catch(errors => {
            //         console.error('Error submitting form data:', errors);
            //         this.errors = errors.response.data.errors;
            //     });
            $("#nextBtn2").trigger("click");
        },
        nextAction() {
            console.log('Form data submitted successfully. Proceeding to the next action.');
            $("#nextBtn2").trigger("click");
        },
        getFormNumber: index => index + 1
    }
});


// Document creation
new Vue({
    el: '#societyDocumentsVue',
    data: {
        formData: new FormData(),
        forms: [
            {}
        ],
        errors: [],
        required_docs_errors: {},
        required_docs_errors2: {},
        showForm: false,
    },
    methods: {
        showFormMethod() {
            this.showForm = true;
        },
        addForm() {
            if (this.showForm) {
                this.forms.push({});
                const newIndex = this.forms.length - 1;
                this.errors = this.errors.filter(error => error.index !== newIndex);
            }
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        submitBothDocs() {
            // this.formData.append('soc_other_document_spec', this.formData.soc_other_document_spec);

            // axios.defaults.xsrfCookieName = 'csrftoken';
            // axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            // // REQUIRED DOC CODE, this.formData coming from handleFileUpload function
            // axios.post('http://127.0.0.1:8000/api/society-registration-documents/', this.formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            //     .then(response => {
            //         console.log('Form data submitted successfully:', response.data);
            //     })
            //     .catch(errors => {
            //         console.error('Error submitting form data:', errors);
            //         this.required_docs_errors = errors.response.data;
            //     });

            // // OTER DOCUMENTS
            // this.forms.forEach((form, index) => {
            //     const formData2 = new FormData();
            //     // const payload = {
            //     //     other_document_specification: form.other_document_specification,
            //     // }

            //     formData2.append('other_document_specification', form.other_document_specification);

            //     const refName = 'other_document_' + index;
            //     const inputElement = this.$refs[refName];
            //     if (inputElement && inputElement.length > 0) {
            //         console.log("doc ==>", inputElement[0].files[0]);
            //         formData2.append('other_document', inputElement[0].files[0]);
            //     }

            //     if (formData2) {
            //         axios.post('http://127.0.0.1:8000/api/society-other-docs/', formData2, {
            //             headers: {
            //                 'Content-Type': 'multipart/form-data'
            //             }
            //         })
            //             .then(response => {
            //                 console.log('Form data submitted successfully:', response.data);
            //             })
            //             .catch(errors => {
            //                 console.error('Error submitting form data:', errors);
            //                 this.errors = errors.response.data.errors;
            //             });
            //     }
            // });
            $("#nextBtn3").trigger("click");
        },
        nextAction() {
            console.log('Form data submitted successfully. Proceeding to the next action.');
            $("#nextBtn3").trigger("click");
        },
        handleFileUpload(event, ref) {
            const fileInput = this.$refs[ref];
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                this.formData.append(ref, file);
            }
        },
        getFormNumber: index => index + 1
    }
})


// Wing Create
new Vue({
    el: '#wingCreation',
    data: {
        forms: [
            {}
        ],
        errors: [],
    },
    methods: {
        addForm() {
            this.forms.push({});
            const newIndex = this.forms.length - 1;
            // this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        // hasError(index, field) {
        //     return this.errors.some(error => error.index === index && error[field]);
        // },
        // getError(index, field) {
        //     const error = this.errors.find(error => error.index === index);
        //     return error ? error[field][0] : '';
        // },
        submitWingFlat() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            this.forms.forEach((form, index) => {
                const formData = new FormData();
                formData.append('wing_name', form.wing_name);
                formData.append('flat_number', form.flat_number);

                axios.post('http://127.0.0.1:8000/api/wing-flat/', formData, {})
                    .then(response => {
                        console.log('Form data submitted successfully:', response.data);
                    })
                    .catch(errors => {
                        console.error('Error submitting form data:', errors);
                        this.errors = errors.response.data.errors;
                    });
            });
        },
        getFormNumber: index => index + 1
    },
    // mounted() {
    //     axios.get('http://127.0.0.1:8000/api/wing/')
    //         .then(response => {
    //             console.log("WINGS  DIWSPLAY===", response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // },
});


// Add wing from society details modal
new Vue({
    el: '#wingCreationUpdate',
    data: {
        forms: [
            {}
        ],
        errors: [],
    },
    methods: {
        addForm() {
            this.forms.push({});
            const newIndex = this.forms.length - 1;
            // this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        // hasError(index, field) {
        //     return this.errors.some(error => error.index === index && error[field]);
        // },
        // getError(index, field) {
        //     const error = this.errors.find(error => error.index === index);
        //     return error ? error[field][0] : '';
        // },
        submitWingFlat() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            this.forms.forEach((form, index) => {
                const formData = new FormData();
                formData.append('wing_name', form.wing_name);
                formData.append('flat_number', form.flat_number);

                axios.post('http://127.0.0.1:8000/api/wing-flat/', formData, {})
                    .then(response => {
                        console.log('Form data submitted successfully:', response.data);
                    })
                    .catch(errors => {
                        console.error('Error submitting form data:', errors);
                        this.errors = errors.response.data.errors;
                    });
            });
        },
        getFormNumber: index => index + 1
    },
    // mounted() {
    //     axios.get('http://127.0.0.1:8000/api/wing/')
    //         .then(response => {
    //             console.log("WINGS  DIWSPLAY===", response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // },
});



// Display Wing-Flat
new Vue({
    el: '#wingDisplayVue',
    data: {
        wingFlatData: [],
    },
    methods: {
        updateWingModal(){
            alert("calling");
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/wing-flat/')
            .then(response => {
                console.log("WINGS  DIWSPLAY===", response.data);
                this.wingFlatData = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});

function getObjectId(id) {
    $('#wing_flat_id').val(id);
    $('#editWingFlatDetails').modal('show');
    clearFormData();

    const wingFlatId = $('#wing_flat_id').val();

    // Make an HTTP request using Axios
    axios.get(`http://127.0.0.1:8000/api/wing-flat/${wingFlatId}`)
        .then(response => {
            updateFormFields(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to clear form data
function clearFormData() {
    $('#wingFlatForm')[0].reset();
}

// Function to update form fields with response data
function updateFormFields(formData) {
    $('#wing_name').val(formData.wing_name);
    $('#flat_number').val(formData.flat_number);
}


function updateWingFlatData() {
    let getIdForUpdate = $('#wing_flat_id').val();
    wing_name = $('#wing_name').val();
    flat_number = $('#flat_number').val();

    const formData = new FormData();
    formData.append('wing_name', wing_name);
    formData.append('flat_number', flat_number);

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.patch(`http://127.0.0.1:8000/api/wing-flat/${getIdForUpdate}/`, formData)
        .then(response => {
            console.log("RESPONSE==>", response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}



// EDIT SOCIETY DETAILS:
new Vue({
    el: '#editSocietyVue',
    data: {
        formData: {},
        submitted: false,
        error: null,
        errors: {},
        item: {},
    },
    methods: {
        editSocietyForm() {
            let copiedResponse = this.formData;
            delete copiedResponse.pan_number_doc
            delete copiedResponse.registration_doc
            delete copiedResponse.other_document
            delete copiedResponse.gst_number_doc

            const formData = new FormData();
            this.errors = {};
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        formData.append(key, this.formData[key]);
                    }
                }
            }
            if (this.$refs.registration_doc.files[0]) {
                console.log("FILE REG");
                this.formData.registration_doc = this.$refs.registration_doc.files[0]
            }
            if (this.$refs.pan_number_doc.files[0]) {
                this.formData.pan_number_doc = this.$refs.pan_number_doc.files[0]
            }
            if (this.$refs.gst_number_doc.files[0]) {
                this.formData.gst_number_doc = this.$refs.gst_number_doc.files[0];
            }
            console.log("formdata", this.formData);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            society_id = document.getElementById('society_id').value;

            axios.patch(`http://127.0.0.1:8000/api/society-creation/${society_id}/`, this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("RESPONSE->", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data;
                });
        },
        nextAction() {
            // Your logic for the next action after form submission
            console.log('Form data submitted successfully. Proceeding to the next action.');

            // Trigger the click event for ".next" button
            $("#nextBtn").trigger("click");
        },
        clearErrors() {
            this.errors = {};
        },
    },
    mounted() {
        console.log("Society Details Mounted Calling!");
        society_id = document.getElementById('society_id').value;
        axios.get(`http://127.0.0.1:8000/api/society-creation/`)
            .then(response => {
                console.log("RESPONSE==>", response.data);
                this.item = response.data;
                this.formData = response.data;
                console.log("ITEM==>", this.item);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    },
});


// ADD BANK DETAILS ON MODAL:
new Vue({
    el: '#bankContainerModal',
    data: {
        forms: [{}],
        errors: [],
    },
    methods: {
        addForm() {
            this.forms.push({});
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        submitBankModal() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            axios.post('http://127.0.0.1:8000/api/society_bank/', this.forms, {})
                .then(response => {
                    console.log('Form data submitted successfully:', response.data);
                    this.nextAction();
                })
                .catch(errors => {
                    console.error('Error submitting form data:', errors);
                    this.errors = errors.response.data.errors;
                });
        },
        getFormNumber: index => index + 1
    }
});


// WIng create
new Vue({
    el: '#wingCreation',
    data: {
        forms: [
            {}
        ],
        errors: [],
    },
    methods: {
        addForm() {
            this.forms.push({});
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        submitWingFlat() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            this.forms.forEach((form, index) => {
                const formData = new FormData();
                formData.append('wing_name', form.wing_name);
                formData.append('flat_number', form.flat_number);

                axios.post('http://127.0.0.1:8000/api/wing/', formData, {})
                    .then(response => {
                        console.log('Form data submitted successfully:', response.data);
                    })
                    .catch(errors => {
                        console.error('Error submitting form data:', errors);
                        this.errors = errors.response.data.errors;
                    });
            });
        },
        getFormNumber: index => index + 1
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/wing/')
            .then(response => {
                console.log("WINGS  DIWSPLAY===", response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});


// Document creation
new Vue({
    el: '#societyDocumentsContainer',
    data: {
        // formData: new FormData(),
        forms: [
            {
                // other_document: '',
                // other_document_specification: ''
            }
        ],
        errors: [],
        required_docs_errors: {},
    },
    methods: {
        addForm() {
            this.forms.push({
                // other_document: '',
                // other_document_specification: ''
            });
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        submitBothDocs() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            axios.get('http://127.0.0.1:8000/last-object/')
                .then(response => {
                    society_creation_obj = response.data.id
                    this.forms.forEach((form, index) => {
                        const formData = new FormData();

                        formData.append('society_creation', form.society_creation_obj);
                        formData.append('other_document_specification', form.other_document_specification);
                        formData.append('other_document', form.other_document);

                        axios.post('http://127.0.0.1:8000/api/society-other-docs/', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                            .then(response => {
                                console.log('Form data submitted successfully:', response.data);
                            })
                            .catch(errors => {
                                console.error('Error submitting form data:', errors);
                                this.errors = errors.response.data.errors;
                            });
                    });
                })
                .catch(errors => {
                    console.error('Error submitting form data:', errors);
                    this.errors = errors.response.data.errors;
                });
        },
        handleFileUpload(event, index) {
            const selectedFile = event.target.files[0];
            console.log('Selected File:', selectedFile);

            if (selectedFile) {
                this.forms[index]['other_document'] = selectedFile;
            }
            console.log("again", this.forms[index]);
        },
        getFormNumber: index => index + 1
    }
});

// BANK ON SOCIETY DETAILS PAGE:
new Vue({
    el: '#bankDisplayVue',
    data: {
        bankData: {},
        formData: {},
        errors: {},
        // formInput: new FormData(),
        // tenantData: [],
        // tenantIdToUpdate: null,
    },
    methods: {
        bankUpdate(id) {
            // this.tenantIdToUpdate = id;
            $('#editBankDetails').modal('show');
            axios.get(`http://127.0.0.1:8000/api/society_bank/${id}/`)
                .then(response => {
                    console.log("CALLING FOR EDIT BANK", response.data);
                    this.formData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitBankUpdatedData(id){
            console.log("id from submit====>", id);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    formData.append(key, this.formData[key]);
                }
            }

            axios.patch(`http://127.0.0.1:8000/api/society_bank/${id}/`, formData)
                .then(response => {
                    console.log("Form Submitted:", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors );
                });
        },
        deleteBank(id){
            console.log("id====", id);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.delete(`http://127.0.0.1:8000/api/society_bank/${id}/`)
            .then(response => {
                console.log("Form Submitted:", response.data);
            })
            .catch(error => {
                this.errors = error.response.data
                console.log("Error Submitting:", this.errors );
            });

        },
        // updateTenant(){
        //     for (const key in this.formData) {
        //         if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
        //             if (this.formData[key] !== null) {
        //                 this.formInput.append(key, this.formData[key]);
        //             }
        //         }
        //     }

        //     axios.defaults.xsrfCookieName = 'csrftoken';
        //     axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        //     axios.patch(`http://127.0.0.1:8000/api/tenant_creation/${this.tenantIdToUpdate}/`, this.formInput, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //         .then(response => {
        //             console.log("Form Submitted:", response.data);
        //         })
        //         .catch(error => {
        //             this.errors = error.response.data
        //             console.log("Error Submitting:", this.errors );
        //         });
        // },
        // viewRequestedData(id) {
        //     $('#tenentViewModal').modal('show');
        //     axios.get(`http://127.0.0.1:8000/api/tenant_creation/${id}/`)
        //         .then(response => {
        //             this.formData = response.data;
        //         })
        //         .catch(error => {
        //             console.error('Error fetching data:', error);
        //         });
        // },
        // submitTenant() {
        //     for (const key in this.formData) {
        //         if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
        //             if (this.formData[key] !== null) {
        //                 this.formInput.append(key, this.formData[key]);
        //             }
        //         }
        //     }

        //     axios.defaults.xsrfCookieName = 'csrftoken';
        //     axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        //     axios.post('http://127.0.0.1:8000/api/tenant_creation/', this.formInput, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //         .then(response => {
        //             console.log("Form Submitted:", response.data);
        //         })
        //         .catch(error => {
        //             this.errors = error.response.data
        //             console.log("Error Submitting:", this.errors );

        //         });
        // },
        // handleFileChange(event, refName){
        //     const selectedFile = event.target.files[0];

        //     if (selectedFile) {
        //         this.formInput.append(refName, selectedFile);
        //     }
        // },
        // clearErrors() {
        //     this.errors = {};
        // },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/society_bank/')
            .then(response => {
                this.bankData = response.data;
                console.log("BANK DATA FROM MOUNT==>", this.bankData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // $('#tenentCreation, #tenentUpdateModal').on('hidden.bs.modal', () => {
        //     this.clearErrors();
        //     this.formData = {};
        // });
    },
})



// MEMBERS PAGE START

// MEMBER MASTER TABLE AND EDIT
var app = new Vue({
    el: '#memberMasterTableVue',
    data: {
        vehicle_id: null,
        vehicleData: [],
        gstData: {},
        attach_noc: false,
        formData: {},
        formData2: {
            folio_number: '',
        },
        homeLoanData: {},
        members: [],
        errors: {},
        memberData: {},
        memberHistory: [],
        primaryMembers: [],
        nonPrimaryMembers: [],
        memberformData: [],
        units: [],
        forms: [],
        member: {
            member_name: ''
        },
        sharesData: {},
        homeLoanData: {},
        gstData: {},
        vehicleData: [],
        addSharesOnEdit: false,
        addHomeLoanOnEdit: false,
        addGSTOnEdit: false,
        addVehicleOnEdit: false,
        nominee: {},
        forms: [
            {}
        ],
        vehicleDataOnEdit: {},
        wing_flat: '',
        sharesHistoryData: [],
        homeLoanHistoryData: [],
        gstHistoryData: [],
        vehicleHistoryData: [],
        addNewNomineeMemberId: '',
        addNomineeError: {},
    },
    methods: {
        // ADD VEHICLE START
        addForm() {
            this.forms.push({});
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        getFormNumber: index => index + 1,
        // ADD VEHICLE END

        viewMemberData(id) {
            $('#viewMemberModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/members/${id}`)
                .then(response => {
                    this.memberData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            axios.get(`http://127.0.0.1:8000/api/home-loan/${id}`)
                .then(response => {
                    this.homeLoanData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            axios.get(`http://127.0.0.1:8000/api/shares/${id}`)
                .then(response => {
                    this.sharesData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            axios.get(`http://127.0.0.1:8000/api/flat-gst/${id}`)
                .then(response => {
                    this.gstData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            axios.get(`http://127.0.0.1:8000/api/vehicle/${id}/`)
                .then(response => {
                    this.vehicleData = response.data;
                    console.log("VEHICLE ID=>>---------------->>>->>>", this.vehicleData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        editMemberData(id, wing_flat) {
            this.wing_flat = wing_flat;
            $('#editMemberModal').modal('show');
            console.log("id:===", id);
            axios.get(`http://127.0.0.1:8000/api/members/${id}/`)
                .then(response => {
                    this.memberformData = response.data;
                    console.log("MEMBER EDIT MODAL===>", this.memberformData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            axios.get(`http://127.0.0.1:8000/api/shares/${id}/`)
                .then(response => {
                    this.formData = response.data;
                    console.log("SHARES EDIT------------------->>>>>>===>", this.formData);
                    this.addSharesOnEdit = false;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    console.log("SHARES EDIT------------------->>>>>>===>", wing_flat);
                    this.addSharesOnEdit = true;
                    this.formData = {
                        wing_flat: wing_flat,
                    }
                });

            axios.get(`http://127.0.0.1:8000/api/home-loan/${id}/`)
                .then(response => {
                    this.homeLoanData = response.data;
                    delete this.homeLoanData.bank_noc_file;
                    this.addHomeLoanOnEdit = false;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.addHomeLoanOnEdit = true;
                    this.homeLoanData = {
                        wing_flat: wing_flat,
                    }
                });

            axios.get(`http://127.0.0.1:8000/api/flat-gst/${id}/`)
                .then(response => {
                    this.gstData = response.data;
                    console.log("LOAN===>", this.gstData);
                    this.addGSTOnEdit = false;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.addGSTOnEdit = true;
                    this.gstData = {
                        wing_flat: wing_flat,
                    }
                });

            axios.get(`http://127.0.0.1:8000/api/vehicle/${id}/`)
                .then(response => {
                    this.vehicleData = response.data;
                    this.vehicle_id = this.vehicleData.id;
                    this.addVehicleOnEdit = false;
                    console.log("CURRENT===============================", this.vehicleData.length == 0)
                    if (this.vehicleData.length == 0) {
                        this.addVehicleOnEdit = true;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        addSharesVue() {
            alert("calling");
            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    formData.append(key, this.formData[key]);
                }
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/shares/', formData)
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                    // this.nextAction();
                    alert("success");
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        updateSharesData(id) {
            console.log("id===>", id);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    console.log(key);
                    formData.append(key, this.formData[key]);
                }
            }
            axios.patch(`http://127.0.0.1:8000/api/shares/${id}/`, formData)
                .then(response => {
                    console.log("Shares data uPdated", response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        homeLoanVue() {
            const homeLoanData = new FormData();
            for (const key in this.homeLoanData) {
                if (Object.prototype.hasOwnProperty.call(this.homeLoanData, key)) {
                    homeLoanData.append(key, this.homeLoanData[key]);
                }
            }
            if (this.$refs.bank_noc_file && this.$refs.bank_noc_file.files && this.$refs.bank_noc_file.files.length > 0) {
                console.log("File present");
                homeLoanData.append('bank_noc_file', this.$refs.bank_noc_file.files[0]);
            }

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/home-loan/', homeLoanData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                    this.nextAction();
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error: ->", error.response.data.folio_number[0]);
                });
        },
        addNomineeOnEdit(member_id) {
            this.addNewNomineeMemberId = member_id;
            $('#addNomineeModal').modal('show');
        },
        addNomineeOnClick(member_id) {
            const nominee = new FormData();

            nominee.append("member_name", this.addNewNomineeMemberId);
            for (const key in this.nominee) {
                if (Object.prototype.hasOwnProperty.call(this.nominee, key)) {
                    nominee.append(key, this.nominee[key]);
                }
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/add-nominee/', nominee)
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                    this.nextAction();
                })
                .catch(error => {
                    this.addNomineeError = error.response.data
                    console.log("Errors=000=>", this.addNomineeError);
                });
        },
        addGST() {
            const gstData = new FormData();
            for (const key in this.gstData) {
                if (Object.prototype.hasOwnProperty.call(this.gstData, key)) {
                    gstData.append(key, this.gstData[key]);
                }
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/flat-gst/', gstData)
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                    this.nextAction();
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error: ->", error.response.data.folio_number[0]);
                });
        },
        loanFormSubmit(id) {
            console.log("Bank LOan", id);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            const formData = new FormData();
            for (const key in this.homeLoanData) {
                if (Object.prototype.hasOwnProperty.call(this.homeLoanData, key)) {
                    formData.append(key, this.homeLoanData[key]);
                }
            }
            axios.patch(`http://127.0.0.1:8000/api/home-loan/${id}/`, formData)
                .then(response => {
                    console.log("Shares data uPdated", response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        gstDataSubmit(id) {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            const formData = new FormData();
            for (const key in this.gstData) {
                if (Object.prototype.hasOwnProperty.call(this.gstData, key)) {
                    formData.append(key, this.gstData[key]);
                }
            }
            axios.patch(`http://127.0.0.1:8000/api/flat-gst/${id}/`, formData)
                .then(response => {
                    console.log("Shares data uPdated", response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        vehicleEditSubmit() {
            console.log("VEHICLE COMPLETE DATA->", this.vehicleData);
            this.vehicleData.forEach((form, index) => {
                const formData = new FormData();

                const payload = {
                    wing_flat: this.formData.wing_flat,
                    parking_lot: form.parking_lot,
                    vehicle_type: form.vehicle_type,
                    vehicle_number: form.vehicle_number,
                    vehicle_brand: form.vehicle_brand,
                    sticker_number: form.sticker_number,
                    chargable: form.chargable ? form.chargable : '',
                }

                formData.append('data', JSON.stringify(payload));

                const refName = 'rc_copy_' + index;
                const inputElement = this.$refs[refName];
                if (inputElement && inputElement.length > 0) {
                    console.log("doc ==>", inputElement[0].files[0]);
                    formData.append('rc_copy', inputElement[0].files[0]);
                }

                axios.defaults.xsrfCookieName = 'csrftoken';
                axios.defaults.xsrfHeaderName = 'X-CSRFToken';
                axios.patch(`http://127.0.0.1:8000/api/vehicle/${form.id}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log('Form data submitted successfully:', response.data);
                    })
                    .catch(errors => {
                        console.error('Error submitting form data:', errors);
                        this.errors = errors.response.data.errors;
                    });
            });
        },
        addVehicleOnEditModal() {
            $('#addVehicleModal').modal('show');
        },
        addVehicleOnEditButton() {
            // console.log("GET WING FLAT!!!!!!!!!!!!!!!!==========", this.wing_flat)
            this.forms.forEach((form, index) => {
                const vehicleDataOnEdit = new FormData();

                const payload = {
                    wing_flat: this.wing_flat,
                    parking_lot: form.parking_lot,
                    vehicle_type: form.vehicle_type,
                    vehicle_number: form.vehicle_number,
                    vehicle_brand: form.vehicle_brand,
                    sticker_number: form.sticker_number,
                    chargable: form.chargable ? form.chargable : '',
                }

                vehicleDataOnEdit.append('data', JSON.stringify(payload));

                const refName = 'rc_copy_' + index;
                const inputElement = this.$refs[refName];
                if (inputElement && inputElement.length > 0) {
                    console.log("doc ==>", inputElement[0].files[0]);
                    vehicleDataOnEdit.append('rc_copy', inputElement[0].files[0]);
                }


                axios.defaults.xsrfCookieName = 'csrftoken';
                axios.defaults.xsrfHeaderName = 'X-CSRFToken';
                axios.post('http://127.0.0.1:8000/api/vehicle/', vehicleDataOnEdit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log('Form data submitted successfully:', response.data);
                    })
                    .catch(errors => {
                        console.error('Error submitting form data:', errors);
                        this.errors = errors.response.data.errors;
                    });
            });
        },
        submitEditedMemberData() {
            console.log("MEMBER COMPLETE DATA->", this.memberData);
            let cessation = ''
            this.memberformData.forEach((form, index) => {
                if (form.date_of_cessation) {
                    console.log("member name-->", form.date_of_cessation);
                    cessation = form.date_of_cessation;
                }
            });

            console.log(cessation);

            this.memberformData.forEach((form, index) => {
                const formData = new FormData();
                delete form.sales_agreement;
                delete form.other_attachment;
                console.log("MEMER ID->", form.id);
                console.log("ONLY FORM->", form);
                console.log("ONLY FORM->", form.sales_agreement);
                const payload = {};
                for (const key in form) {
                    if (Object.prototype.hasOwnProperty.call(form, key)) {
                        if (key == 'date_of_cessation') {
                            console.log("owner ship gives");
                            payload[key] = cessation
                        }
                        // console.log(key);
                        if (form[key] !== null) {
                            payload[key] = form[key];
                        }
                    }
                }
                // payload['nominees'] = this.forms;
                console.log("payload", payload);
                formData.append('data', JSON.stringify(payload));


                const refName = 'sales_agreement_' + index;
                const inputElement = this.$refs[refName];
                if (inputElement && inputElement.length > 0) {
                    console.log("doc ==>", inputElement[0].files[0]);
                    formData.append('sales_agreement', inputElement[0].files[0]);
                }

                const otherDoc = 'other_attachment_' + index;
                const inputElementDoc = this.$refs[otherDoc];
                if (inputElementDoc && inputElementDoc.length > 0) {
                    console.log("doc ==>", inputElementDoc[0].files[0]);
                    formData.append('other_attachment_', inputElementDoc[0].files[0]);
                }


                // console.log("payload", payload);

                axios.defaults.xsrfCookieName = 'csrftoken';
                axios.defaults.xsrfHeaderName = 'X-CSRFToken';
                axios.patch(`http://127.0.0.1:8000/api/members/${form.id}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log('Form data submitted successfully. Proceeding to the next action.', response.data);
                        this.nextAction();
                    })
                    .catch(error => {
                        this.required_docs_errors = error.response
                    });
            });
        },
        addMemberData(id) {
            $('#addMemberModal').modal('show');
        },
        memberHistoryData(wing_flat) {
            console.log("wing_flat=======", wing_flat);
            $('#memberHistoryModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/history/?wing_flat__id=${wing_flat}`)
                .then(response => {
                    if(response.data){
                        console.log("RESPONSE ~~~~~~~~~~~~~~~~~~~~~~~~==>", response.data[0]['same_flat_member_identification']);
                        this.memberHistory = response.data;

                        if (this.memberHistory.length != 0) {
                            this.primaryMembers = [];
                            this.nonPrimaryMembers = [];
                            response.data.forEach(member => {
                                if (member.member_is_primary) {
                                    this.primaryMembers.push(member);
                                } else {
                                    this.nonPrimaryMembers.push(member);
                                }
                            });
                        } else {
                            this.primaryMembers = [];
                            this.nonPrimaryMembers = [];
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            // GET SHARES DATA
            axios.get(`http://127.0.0.1:8000/api/shares/`)
                .then(response => {
                    this.sharesHistoryData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            // HOME LOAN DATA
            axios.get(`http://127.0.0.1:8000/api/home-loan/`)
                .then(response => {
                    this.homeLoanHistoryData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            // GST DATA
            axios.get(`http://127.0.0.1:8000/api/flat-gst/`)
                .then(response => {
                    this.gstHistoryData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            // VEHICLE DATA
            axios.get(`http://127.0.0.1:8000/api/vehicle/`)
                .then(response => {
                    this.vehicleHistoryData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        clearErrors() {
            this.errors = {};
        },
        handleChangeFile() {

        },
        submitBothDocs() {
        },
        handleFileChange() {

        },
        loanStatus(event) {
            this.attach_noc = false;
            if (event.target.value == 'yes') {
                this.attach_noc = true;
            }
        },
        hasError() {

        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/members/')
            .then(response => {
                console.log("DATA===", response.data);
                response.data.forEach(element => {
                    delete element.nominees;
                });

                this.members = response.data;
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // $('#houseHelpUpdation').on('hidden.bs.modal', () => {
        //     this.clearErrors();
        // });
    },
});


// ADD MEMBER
new Vue({
    el: '#addMemberDiv',
    data: {
        units: [],
        formData: new FormData(),
        formData2: new FormData(),
        forms: [
            {}
        ],
        errors: [],
        required_docs_errors: {},
        flat_having_primary_mem: true,
        ownershipError: '',
    },
    methods: {
        addForm() {
            this.forms.push({
            });
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        submitBothDocs() {
            const payload = {};
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        payload[key] = this.formData[key];
                    }
                }
            }
            payload['nominees'] = this.forms;
            this.formData.append('data', JSON.stringify(payload));

            console.log("payload", payload);

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/members/', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log('Form data submitted successfully. Proceeding to the next action.', response.data);
                    this.nextAction();
                })
                .catch(error => {
                    this.required_docs_errors = error.response.data
                });
            // $("#redirectToShares").trigger("click");

        },
        getOwnership(flat_no, event) {
            let inputValue = event.target.value;
            if (flat_no) {
                axios.get(`http://127.0.0.1:8000/get_ownership/${flat_no}/`)
                    .then(response => {
                        let existingOwnership = response.data.ownership_total
                        if (inputValue >= existingOwnership) {
                            this.ownershipError = `This flat left with ${100 - existingOwnership} ownership!`
                        } else {
                            this.ownershipError = ''
                        }
                    })
                    .catch(error => {
                        this.required_docs_errors = error.response.data
                    });
            }
        },
        handleChangeFile() {
            if (this.$refs.sales_agreement.files[0]) {
                this.formData.append('sales_agreement', this.$refs.sales_agreement.files[0]);
                console.log(this.$refs.sales_agreement.files[0]);
            }
            if (this.$refs.other_attachment.files[0]) {
                this.formData.append('other_attachment', this.$refs.other_attachment.files[0]);
            }
        },
        get_checkbox_value(event) {
            console.log("cahnge ecveny", event.target.value);
            axios.get(`http://127.0.0.1:8000/non-primary/${event.target.value}/`)
                .then(response => {
                    console.log(response.data.member_status);
                    this.flat_having_primary_mem = response.data.member_status
                })
                .catch(error => {
                    this.required_docs_errors = error.response.data
                });
        },
        nextAction() {
            console.log('Form data submitted successfully. Proceeding to the next action.');
            $("#redirectToShares").trigger("click");
        },
        getFormNumber: index => index + 1
    },
    mounted() {
        console.log("mounted===========");
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});


// Add Shares Details
new Vue({
    el: '#sharesAddVue',
    data: {
        units: [],
        formData: {},
        errors: {},
    },
    methods: {
        submitSharesForm() {
            // console.log("callinng");
            // this.errors = {};
            // const formData = new FormData();
            // for (const key in this.formData) {
            //     if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
            //         formData.append(key, this.formData[key]);
            //     }
            // }
            // axios.defaults.xsrfCookieName = 'csrftoken';
            // axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            // axios.post('http://127.0.0.1:8000/api/shares/', formData)
            //     .then(response => {
            //         console.log('Form submitted successfully:', response.data);
            //         this.nextAction();
            //     })
            //     .catch(error => {
            //         this.errors = error.response.data
            //     });
            $("#hLoan").trigger("click");
        },
        nextAction() {
            console.log('Form data submitted successfully. Proceeding to the next action.');
            $("#hLoan").trigger("click");
        },
    },
    mounted() {
        console.log("mounted calling");
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});


// Add Home Loan Details
new Vue({
    el: '#homeLoanVue',
    data: {
        units: [],
        formData: {},
        errors: {},
        attach_noc: false,
    },
    methods: {
        submitHomeLoanForm() {
            this.errors = {};
            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    formData.append(key, this.formData[key]);
                }
            }
            if (this.$refs.bank_noc_file && this.$refs.bank_noc_file.files && this.$refs.bank_noc_file.files.length > 0) {
                console.log("File present");
                formData.append('bank_noc_file', this.$refs.bank_noc_file.files[0]);
            }

            // axios.defaults.xsrfCookieName = 'csrftoken';
            // axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            // axios.post('http://127.0.0.1:8000/api/home-loan/', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            //     .then(response => {
            //         console.log('Form submitted successfully:', response.data);
            //         this.nextAction();
            //     })
            //     .catch(error => {
            //         this.errors = error.response.data
            //         console.log("Error: ->", error.response.data.folio_number[0]);
            //     });
            $("#redirectToGst").trigger("click");
        },
        loanStatus(event) {
            this.attach_noc = false;
            if (event.target.value == 'yes') {
                this.attach_noc = true;
            }
        },
        nextAction() {
            console.log('Form data submitted successfully. Proceeding to the next action.');
            $("#redirectToGst").trigger("click");
        },
    },
    mounted() {
        console.log("mounted calling");
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});


// Add GST Details
new Vue({
    el: '#GSTaddVue',
    data: {
        units: [],
        formData: {},
        errors: {},
    },
    methods: {
        submitGSTForm() {
            console.log("callinng");
            this.errors = {};
            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    formData.append(key, this.formData[key]);
                }
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            // axios.post('http://127.0.0.1:8000/api/flat-gst/', formData)
            //     .then(response => {
            //         console.log('Form submitted successfully:', response.data);
            //         this.nextAction();
            //     })
            //     .catch(error => {
            //         this.errors = error.response.data
            //         console.log("Error: ->", error.response.data.folio_number[0]);
            //     });
            $("#addGstNext").trigger("click");
        },
        nextAction() {
            console.log('Form data submitted successfully. Proceeding to the next action.');
            $("#addGstNext").trigger("click");
        },
    },
    mounted() {
        console.log("mounted calling");
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});


// Add Vehicle Details
new Vue({
    el: '#addVehicleVue',
    data: {
        units: [],
        formData: {},
        forms: [
            {}
        ],
        errors: [],
        // wing_flat: '',
    },
    methods: {
        addForm() {
            this.forms.push({});
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            const error = this.errors.find(error => error.index === index);
            return error ? error[field][0] : '';
        },
        submitVehicle() {
            // console.log("wing_flat ==>", this.formData.wing_flat);
            this.forms.forEach((form, index) => {
                const formData = new FormData();

                const payload = {
                    wing_flat: this.formData.wing_flat,
                    parking_lot: form.parking_lot,
                    vehicle_type: form.vehicle_type,
                    vehicle_number: form.vehicle_number,
                    vehicle_brand: form.vehicle_brand,
                    sticker_number: form.sticker_number,
                    chargable: form.chargable ? form.chargable : '',
                }

                formData.append('data', JSON.stringify(payload));

                const refName = 'rc_copy_' + index;
                const inputElement = this.$refs[refName];
                if (inputElement && inputElement.length > 0) {
                    console.log("doc ==>", inputElement[0].files[0]);
                    formData.append('rc_copy', inputElement[0].files[0]);
                }


                axios.post('http://127.0.0.1:8000/api/vehicle/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log('Form data submitted successfully:', response.data);
                    })
                    .catch(errors => {
                        console.error('Error submitting form data:', errors);
                        this.errors = errors.response.data.errors;
                    });
            });
        },
        getFormNumber: index => index + 1
    },
    mounted() {
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});


// MEMBERS PAGE END




// HOUSE HELP START

// HOUSE HELP TABLE AND EDIT
var app = new Vue({
    el: '#houseHelpTableDiv',
    data: {
        formData: {
        },
        houseHelp: [],
        errors: {},
        houseHelpData: {},
    },
    methods: {
        editRequestedData(id) {
            console.log('Clicked!', id);
            $('#houseHelpUpdation').modal('show');
            var self = this;
            axios.get(`http://127.0.0.1:8000/api/househelp/${id}/`)
                .then(response => {
                    this.formData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        viewRequestedData(id) {
            console.log('Clicked!', id);
            $('#houseHelpView').modal('show');
            axios.get(`http://127.0.0.1:8000/api/househelp/${id}/`)
                .then(response => {
                    // this.formData = response.data;
                    this.houseHelpData = response.data;
                    console.log("DATA===", response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitForm(id) {
            this.errors = {};
            const formData = new FormData();
            formData.append('transfer_to_folio_no', this.formData.transfer_to_folio_no);
            formData.append('house_help_name', this.formData.house_help_name)
            formData.append('house_help_pan_number', this.formData.house_help_pan_number)
            formData.append('house_help_contact', this.formData.house_help_contact)
            formData.append('house_help_aadhar_number', this.formData.house_help_aadhar_number)
            formData.append('house_help_address', this.formData.house_help_address)
            formData.append('house_help_city', this.formData.house_help_city)
            formData.append('house_help_state', this.formData.house_help_state)
            formData.append('house_help_pin', this.formData.house_help_pin)
            formData.append('other_document_specifications', this.formData.other_document_specifications)

            // Append files if they are present
            if (this.$refs.house_help_pan_doc.files[0]) {
                formData.append('house_help_pan_doc', this.$refs.house_help_pan_doc.files[0]);
            }
            if (this.$refs.house_help_aadhar_doc.files[0]) {
                formData.append('house_help_aadhar_doc', this.$refs.house_help_aadhar_doc.files[0]);
            }
            if (this.$refs.other_doc.files[0]) {
                formData.append('other_doc', this.$refs.other_doc.files[0]);
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/househelp/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.submitted = true;
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        submitHouseHelp() {
            $('#houseHelpCreation').modal('show');
            const formData = new FormData();
            this.errors = {};
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        formData.append(key, this.formData[key]);
                    }
                }
            }
            if (this.$refs.house_help_pan_doc.files[0]) {
                this.formData.house_help_pan_doc = this.$refs.house_help_pan_doc.files[0]
            }
            if (this.$refs.house_help_aadhar_doc.files[0]) {
                this.formData.house_help_aadhar_doc = this.$refs.house_help_aadhar_doc.files[0]
            }
            if (this.$refs.other_doc.files[0]) {
                this.formData.other_doc = this.$refs.other_doc.files[0];
            }
            console.log("formdata", this.formData);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/househelp/', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.submitted = true;
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        clearErrors() {
            this.errors = {};
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/househelp/')
            .then(response => {
                this.houseHelp = response.data;
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        $('#houseHelpUpdation').on('hidden.bs.modal', () => {
            this.clearErrors();
        });
    },
});

// ADD HOUSE HELP ALLOCATION
new Vue({
    el: '#houseHelpAllocationCreation',
    data: {
        formData: {
            wing_flat: '',
            member_name: '',
            aadhar: '',
            pan: '',
            name: '',
            role: '',
            house_help_period_from: '',
            house_help_period_to: '',
            // pk: '',
        },
        submitted: false,
        error: null,
        errors: {},
        units: [],
    },
    methods: {
        addHouseHelpAllocation() {
            this.errors = {};
            const formData = new FormData();
            // for (const key in this.formData) {
            //     if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
            //         if (this.formData[key] !== null) {
            //             formData.append(key, this.formData[key]);
            //         }
            //     }
            // }
            console.log("--------------------=======", this.formData.wing_flat);

            formData.append('wing_flat', this.formData.wing_flat);
            formData.append('member_name', this.formData.pk);
            formData.append('aadhar_pan', this.formData.aadharPanPk);
            formData.append('house_help_name', this.formData.aadharPanPk);
            formData.append('role', this.formData.role);
            formData.append('house_help_period_from', this.formData.house_help_period_from);
            formData.append('house_help_period_to', this.formData.house_help_period_to);

            console.log("ggggggggggggggggg", this.formData.member_name);
            // console.log("formdata", this.formData);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/househelpallocation/', formData)
                .then(response => {
                    this.submitted = true;
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        getAadharPan(event) {
            // console.log('Input value:', event.target.value);
            let searchValue = event.target.value.trim();
            if (searchValue) {
                axios.get(`http://127.0.0.1:8000/api/househelp/?search=${searchValue}`)
                    .then(response => {
                        if (response.data.length > 0 && response.data[0].house_help_name) {
                            this.formData.name = response.data[0].house_help_name;
                            this.formData.aadharPanPk = response.data[0].id;
                        } else {
                            this.formData.name = "Not Found.";
                            this.formData.aadharPanPk = "Not Found."
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        this.formData.name = "";
                    });
            } else {
                // Set formData.name to empty or handle differently based on your requirements
                this.formData.name = "";
            }
        },
        getOwnerName(event) {
            console.log('event====', event.target.value);
            let selectedVal = event.target.value;
            if (selectedVal) {
                this.formData.wing_flat = selectedVal;
                axios.get(`http://127.0.0.1:8000/api/owner_name/${selectedVal}/`)
                    .then(response => {
                        this.formData.member_name = response.data.member_name;
                        this.formData.pk = response.data.id;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        },
        clearErrors() {
            this.errors = {};
        },
    },
    mounted() {
        // $('#houseHelpAllocationCreation').on('hidden.bs.modal', () => {
        //     this.clearErrors();
        // });

        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});



// TENANT MASTER (CRUD)
new Vue({
    el: '#tenantTableVue',
    data: {
        formData: {},
        formInput: new FormData(),
        tenantData: [],
        errors: {},
        tenantIdToUpdate: null,
    },
    methods: {
        editRequestedData(id) {
            this.tenantIdToUpdate = id;
            $('#tenentUpdateModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/tenant_creation/${id}/`)
                .then(response => {
                    let newResponse = response.data
                    delete newResponse.tenant_pan_doc;
                    delete newResponse.tenant_aadhar_doc;
                    delete newResponse.tenant_other_doc;
                    this.formData = newResponse;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        updateTenant(){
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        this.formInput.append(key, this.formData[key]);
                    }
                }
            }

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/tenant_creation/${this.tenantIdToUpdate}/`, this.formInput, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("Form Submitted:", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors );
                });
        },
        viewRequestedData(id) {
            $('#tenentViewModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/tenant_creation/${id}/`)
                .then(response => {
                    this.formData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitTenant() {
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        this.formInput.append(key, this.formData[key]);
                    }
                }
            }

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/tenant_creation/', this.formInput, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("Form Submitted:", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors );

                });
        },
        handleFileChange(event, refName){
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                this.formInput.append(refName, selectedFile);
            }
        },
        clearErrors() {
            this.errors = {};
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/tenant_creation/')
            .then(response => {
                this.tenantData = response.data;
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        $('#tenentCreation, #tenentUpdateModal').on('hidden.bs.modal', () => {
            this.clearErrors();
            this.formData = {};
        });
    },
})


// TENANT ALLOCATION (CRUD)
new Vue({
    el: '#tenantAllocationVue',
    data: {
        formData: {
            member_name: '',
            tenant_name: '',
            tenant_to_date: '',
        },
        formInput: new FormData(),
        tenantData: [],
        errors: {},
        tenantIdToUpdate: null,
        units: [],
    },
    methods: {
        getAadharPan(event) {
            console.log('Input value:', event.target.value);
            let searchValue = event.target.value.trim();
            if (searchValue) {
                axios.get(`http://127.0.0.1:8000/api/tenant_creation/?search=${searchValue}`)
                    .then(response => {
                        console.log("response---->", response);
                        if (response.data.length > 0 && response.data[0].tenant_name) {
                            this.formData.tenant_name = response.data[0].tenant_name;
                            this.formData.aadharPanPk = response.data[0].id;
                        } else {
                            this.formData.tenant_name = "Not Found.";
                            this.formData.aadharPanPk = ""
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        this.formData.tenant_name = "";
                        this.formData.aadharPanPk = ""
                    });
            } else {
                // Set formData.name to empty or handle differently based on your requirements
                this.formData.name = "";
            }
        },
        getOwnerName(event){
            console.log('event====', event.target.value);
            let selectedVal = event.target.value;
            if (selectedVal) {
                // this.formData.wing_flat = selectedVal;
                axios.get(`http://127.0.0.1:8000/api/owner_name/${selectedVal}/`)
                    .then(response => {
                        console.log("response====", response.data);
                        this.formData.member_name = response.data.member_name;
                        this.formData.pk = response.data.id;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        },
        editRequestedData(id) {
            this.tenantIdToUpdate = id;
            $('#tenentUpdateModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/tenant_allocation/${id}/`)
                .then(response => {
                    let newResponse = response.data
                    delete newResponse.tenant_pan_doc;
                    delete newResponse.tenant_aadhar_doc;
                    delete newResponse.tenant_other_doc;
                    this.formData = newResponse;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        updateTenant(){
            this.formInput.append('tenant_to_date', this.formData.tenant_to_date);

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/tenant_allocation/${this.tenantIdToUpdate}/`, this.formInput)
                .then(response => {
                    console.log("Form Submitted:", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors );
                });
        },
        viewRequestedData(id) {
            $('#tenentViewModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/tenant_allocation/${id}/`)
                .then(response => {
                    this.formData = response.data;
                    console.log("RETRIVED===?", this.formData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitTenant() {
            this.formInput.append('wing_flat', this.formData.wing_flat);
            this.formInput.append('member_name', this.formData.pk);
            this.formInput.append('aadhar_pan', this.formData.aadharPanPk);
            this.formInput.append('tenant_name', this.formData.aadharPanPk);
            this.formInput.append('tenant_from_date', this.formData.tenant_from_date);
            this.formInput.append('tenant_to_date', this.formData.tenant_to_date);
            this.formInput.append('no_of_members', this.formData.no_of_members);


            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/tenant_allocation/', this.formInput, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("Form Submitted:", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors );

                });
        },
        handleFileChange(event, refName){
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.formInput.append(refName, selectedFile);
            }
        },
        clearErrors() {
            this.errors = {};
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/tenant_allocation/')
            .then(response => {
                this.tenantData = response.data;
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        $('#tenentCreation, #tenentUpdateModal').on('hidden.bs.modal', () => {
            this.clearErrors();
            this.formData = {};
        });
    },
})


// HOUSE HELP (ALLOCATION) TABLE AND EDIT
new Vue({
    el: '#houseHelpAllocationTableDiv',
    data: {
        formData: {
        },
        houseHelpAllocation: [],
        errors: {},
        houseHelpAllocationData: {},
    },
    methods: {
        editRequestedData(id) {
            console.log('Clicked!', id);
            $('#houseHelpAllocationUpdation').modal('show');
            var self = this;
            axios.get(`http://127.0.0.1:8000/api/househelpallocation/${id}/`)
                .then(response => {
                    this.formData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        viewRequestedData(id) {
            console.log('Clicked!', id);
            $('#houseHelpAllocationView').modal('show');
            axios.get(`http://127.0.0.1:8000/api/househelpallocation/${id}/`)
                .then(response => {
                    this.houseHelpAllocationData = response.data;
                    console.log("view========", response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitHoseHelpAllocationForm(id) {
            this.errors = {};
            const formData = new FormData();
            formData.append('transfer_to_folio_no', this.formData.transfer_to_folio_no);
            formData.append('house_help_name', this.formData.house_help_name)
            formData.append('house_help_pan_number', this.formData.house_help_pan_number)
            formData.append('house_help_contact', this.formData.house_help_contact)
            formData.append('house_help_aadhar_number', this.formData.house_help_aadhar_number)
            formData.append('house_help_address', this.formData.house_help_address)
            formData.append('house_help_city', this.formData.house_help_city)
            formData.append('house_help_state', this.formData.house_help_state)
            formData.append('house_help_pin', this.formData.house_help_pin)
            formData.append('other_document_specifications', this.formData.other_document_specifications)

            // Append files if they are present
            if (this.$refs.house_help_pan_doc.files[0]) {
                formData.append('house_help_pan_doc', this.$refs.house_help_pan_doc.files[0]);
            }
            if (this.$refs.house_help_aadhar_doc.files[0]) {
                formData.append('house_help_aadhar_doc', this.$refs.house_help_aadhar_doc.files[0]);
            }
            if (this.$refs.other_doc.files[0]) {
                formData.append('other_doc', this.$refs.other_doc.files[0]);
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/househelpallocation/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.submitted = true;
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        submitHouseHelp() {
            $('#houseHelpCreation').modal('show');
            const formData = new FormData();
            this.errors = {};
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        formData.append(key, this.formData[key]);
                    }
                }
            }
            if (this.$refs.house_help_pan_doc.files[0]) {
                this.formData.house_help_pan_doc = this.$refs.house_help_pan_doc.files[0]
            }
            if (this.$refs.house_help_aadhar_doc.files[0]) {
                this.formData.house_help_aadhar_doc = this.$refs.house_help_aadhar_doc.files[0]
            }
            if (this.$refs.other_doc.files[0]) {
                this.formData.other_doc = this.$refs.other_doc.files[0];
            }
            console.log("formdata", this.formData);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/househelpallocation/', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.submitted = true;
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        clearErrors() {
            this.errors = {};
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/househelpallocation/')
            .then(response => {
                this.houseHelpAllocation = response.data;
                console.log("view all", this.houseHelpAllocation)
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        $('#houseHelpAllocationUpdation').on('hidden.bs.modal', () => {
            this.clearErrors();
        });
    },
});


// HOUSE HELP
new Vue({
    el: '#househelpcreationForm',
    data: {
        formData: {
            house_help_name: '',
            house_help_pan_number: '',
            house_help_contact: '',
            house_help_aadhar_number: '',
            house_help_address: '',
            house_help_city: '',
            house_help_state: '',
            house_help_pin: '',
            other_doc: null,
            other_document_specifications: '',
        },
        submitted: false,
        error: null,
        errors: {},
    },
    methods: {
        submitHouseHelp() {
            const formData = new FormData();
            this.errors = {};
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        formData.append(key, this.formData[key]);
                    }
                }
            }
            if (this.$refs.house_help_pan_doc.files[0]) {
                this.formData.house_help_pan_doc = this.$refs.house_help_pan_doc.files[0]
            }
            if (this.$refs.house_help_aadhar_doc.files[0]) {
                this.formData.house_help_aadhar_doc = this.$refs.house_help_aadhar_doc.files[0]
            }
            if (this.$refs.other_doc.files[0]) {
                this.formData.other_doc = this.$refs.other_doc.files[0];
            }
            console.log("formdata", this.formData);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/househelp/', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.submitted = true;
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        clearErrors() {
            this.errors = {};
        },
    },
    mounted() {
        $('#houseHelpCreation').on('hidden.bs.modal', () => {
            this.clearErrors();
        });
    }
});


// HOUSE HELP END



/* ===================================== MEETINGS ================================================== */

var app = new Vue({
    el: '#meetingTableDiv',
    data: {
        minutesFormData: {},
        meeting: [],
        form: {
            meeting: null,
            suggestions: '',
            // minutesContent: '',
            // minutesDoc: '',
            // minutesOtherDoc: '',
        },
        meetingSuggestion: {},
        isModalOpen: false,
        selectedRow: {},
        submitted: false,
        isMinutesFormSubmitted: false,
        singleMeeting: [],
        suggestionsError: '',
        error: null,
        errors: {},
        formData: {},
        minutesError: null,
        minutesErrors: {},
        minutes_content_error: '',
        minutes_file_error: '',
        sameer: {},

        minutesFormData: {
            minutes_content: '',
            minutes_file: null,
            minutes_other: null,
        },

    },

    mounted() {
        axios.get('http://127.0.0.1:8000/api/meetings/')
            .then(response => {
                this.meeting = response.data;
                console.log("Sameer-----", this.meeting);
                $(document).ready(function () {
                    $('#example').DataTable();
                })

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


        const minutesInitialContent =
            `
            <b>NOTICE - ___________________ MEETING</b><br>
            Notice is hereby given that the 5th _______________ of all primary members of ____________________________________________, will be held on _______, the ____ day of ________ at ______ ___ at the ____________________________ to transact the following agenda. <br><br>
            <b>Agenda</b>
            <ol class="m-0 p-0">
                <li>Agenda 1</li>
                <li>Agenda 2</li>
                <li>Agenda 3</li>
            </ol>

            <b>Note: </b><br>(a) In case any points need to be added or discussed, please provide in writing to society bearer at least seven days before AGM. <br>
            (b)  No holder of Power of Attorney or proxy eligible to attend the AGM Meeting.
            `;
        ClassicEditor
            .create(document.querySelector('#minutes_editor'), {
                contentStyles: {
                    color: 'black',
                    'font-family': 'Calibri, sans-serif'
                },
                // data: {
                //     value: initialContent
                // }
            })
            .then(editor => {

                editor.setData(minutesInitialContent);
                // Set the height dynamically
                const editorElement = editor.ui.getEditableElement();
                // editorElement.style.height = '400px';

                // Listen for the CKEditor change event and update formData.content
                editor.model.document.on('change:data', () => {
                    this.minutesFormData.minutes_content = editor.getData();
                });
            })
            .catch(error => {
                console.error(error);
            });


    },

    methods: {
        addMeetingToTop(newMeeting) {
            this.meeting.unshift(newMeeting);
        },
        formatTime(time) {
            // Assuming time is in HH:mm format (24-hour format)
            const [hours, minutes] = time.split(':');
            let formattedTime = `${parseInt(hours, 10) % 12}:${minutes}`;

            // Add AM or PM based on the original hours
            formattedTime += parseInt(hours, 10) >= 12 ? ' PM' : ' AM';

            return formattedTime;
        },

        viewMeetingDetails(id) {
            // alert(id);

            axios.get(`http://127.0.0.1:8000/api/meetings/${id}`)
                .then(response => {
                    this.singleMeeting = response.data;
                    // this.selectedRow = response.data;
                    // this.singleMeeting.formattedTime = this.formatTime(this.singleMeeting.time_of_meeting);
                    console.log("Sameer123123-----", this.singleMeeting);

                    // CKEDITOR.replace('ckeditor', {
                    //     // Add any CKEditor configuration options here if needed
                    // });

                    // // Set CKEditor content with sanitized HTML
                    // CKEDITOR.instances.ckeditor.setData(sanitizeHTML(this.singleMeeting.content));
                    $('#viewMeetingModal .modal-header').text(this.singleMeeting.meeting_type);


                    $('#date').text(this.singleMeeting.date_of_meeting);
                    $('#time').text(this.singleMeeting.time_of_meeting);
                    $('#place').text(this.singleMeeting.place_of_meeting);
                    // $('#agenda').text(this.singleMeeting.agenda);
                    $('#financials').text(this.singleMeeting.financials);
                    // $('#otherDoc').text(this.singleMeeting.other);
                    $('#content').text(this.singleMeeting.content);
                    $('#minutes_content').text(this.singleMeeting.minutes_content);
                    // $('#minutes_document').text(this.singleMeeting.minutes_file);
                    // $('#minutes_other').text(this.singleMeeting.minutes_other);


                    const agendaFileURL = this.singleMeeting.agenda;
                    const agendaFileName = agendaFileURL.split('/').pop();  // Extract the file name
                    const truncatedFileName = agendaFileName.length > 15 ? agendaFileName.substring(0, 15) + '...' : agendaFileName;  // Truncate to 15 characters
                    $('#agendaDoc').html(`<p title="${agendaFileName}"><a href="${agendaFileURL}" style="text-decoration: underline; color: grey" download>${truncatedFileName}</a></p>`);


                    // $('#agendaDoc').html(`<p><a href="${agendaFileURL}" style="text-decoration: underline; color: grey" download>Download Agenda</a></p>`);

                    const financialsFileURL = this.singleMeeting.agenda;
                    const financialsFileName = financialsFileURL.split('/').pop();  // Extract the file name
                    const truncatedFinancialsFileName = financialsFileName.length > 15 ? financialsFileName.substring(0, 15) + '...' : financialsFileName;  // Truncate to 15 characters
                    $('#financialsDoc').html(`<p title="${financialsFileName}"><a href="${financialsFileURL}" style="text-decoration: underline; color: grey" download>${truncatedFinancialsFileName}</a></p>`);
                    // $('#financialsDoc').html(`<p><a href="${financialsFileURL}" style="text-decoration: underline; color: grey" download>Download Financials</a></p>`);

                    const maxLength = 20;
                    const minutesFileUrl = this.singleMeeting.minutes_file;
                    if (minutesFileUrl !== null) {
                        const minutesFileName = minutesFileUrl.split('/').pop();
                        const truncatedMinutesFileName = minutesFileName.length > maxLength ? minutesFileName.substring(0, maxLength - 4) + '...' + minutesFileName.slice(-4) : minutesFileName;
                        this.singleMeeting.minutes_file = truncatedMinutesFileName;
                        $('#minutes_document').html(`<p title="${minutesFileName}"><a href="${minutesFileUrl}" style="text-decoration: underline; color: grey" download>${truncatedMinutesFileName}</a></p>`);
                    }

                    const otherFileUrl = this.singleMeeting.other;
                    if (otherFileUrl !== null) {
                        $('#otherDoc').html(`<p><a href="${otherFileUrl}" style="text-decoration: underline; color: grey" download>Download Other</a></p>`);
                    } else {
                        $('#otherDoc').html(`<p>Unavailable</p>`);
                    }

                    const minutesOtherFileUrl = this.singleMeeting.minutes_other;
                    if (minutesOtherFileUrl !== null) {
                        // const minutesOtherFileUrl = this.edit.minutes_other;
                        const minutesOtherFileName = minutesOtherFileUrl.split('/').pop();
                        const truncatedMinutesOtherFileName = minutesOtherFileName.length > maxLength ? minutesOtherFileName.substring(0, maxLength - 4) + '...' + minutesOtherFileName.slice(-4) : minutesOtherFileName;
                        this.singleMeeting.minutes_other = truncatedMinutesOtherFileName;
                        $('#minutes_other').html(`<p title="${minutesOtherFileName}"><a href="${minutesOtherFileUrl}" style="text-decoration: underline; color: grey" download>${truncatedMinutesOtherFileName}</a></p>`);
                    } else {
                        this.singleMeeting.minutes_other = 'Unavailable';
                        $('#minutes_other').html(`<p>Unavailable</p>`);
                    }


                    $('#viewMeetingModal').modal('show');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });


        },

        attendance(id) {
            // alert(id);
            $('#attendanceModal').modal('show');

            axios.get(`http://127.0.0.1:8000/api/meetings/${id}`)
                .then(response => {
                    this.meetingSuggestion = response.data;
                    $('#attendanceModal .modal-header')
                        .text(this.meetingSuggestion.meeting_type)
                        .html(`<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`);
                    console.log("dekhte hai", $('#attendanceModal .modal-header'));
                    // $('#attendanceModal .modal-header');
                })

            axios.get('http://127.0.0.1:8000/api/wing/')
                .then(response => {
                    this.sameer = response.data;
                    console.log("data aagya", response);
                })
        },

        suggestionForm(id) {
            // alert(id);
            this.form.meeting = id;
            $('#suggestionModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/meetings/${id}`)
                .then(response => {
                    this.meetingSuggestion = response.data;

                    $('#suggestionModal .modal-header').text(this.meetingSuggestion.meeting_type);


                })
        },

        submitSuggestionForm() {
            this.errors = {};
            this.suggestionsError = '';

            const formData = new FormData();
            formData.append('meeting', this.form.meeting)
            formData.append('suggestions', this.form.suggestions)
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/suggestion/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    this.submitted = true,
                        console.log("Submitted Successfully.......", response.data);

                    // $('#suggestionModal .modal-header').text(this.meetingSuggestion.meeting_type);
                    // $('#meeting_type').text(this.meetingSuggestion.meeting_type);
                    // this.form.meeting_type = this.meetingSuggestion.meeting_type;
                    this.error = '';
                    this.suggestionsError = '';
                    // $('#suggestError').text('');
                    this.form.suggestions = '';
                    $('#suggestionModal').modal('hide');

                })
                .catch(error => {

                    console.log("ddddddd", error);
                    if (error.response && error.response.status === 400 && error.response.data) {

                        if (error.response.data.suggestions) {
                            this.suggestionsError = error.response.data.suggestions.join('');
                            // $('#suggestError').text(error.response.data.suggestions);
                            // console.log("Doremon===", error.response.data.suggestions);

                        } else {
                            // $('#suggestError').text('');
                            this.suggestionsError = '';
                        }
                    } else if (error.response && error.response.status) {
                        this.error = `Error: ${error.response.status}`;
                    } else {
                        this.error = 'An error occurred while submitting the form.';
                    }
                })
            // $('#suggestionModal .modal-header').html(`<h5 class="modal-title">${id}</h5>`);
        },



        editForm(id) {
            // alert(id);

            let newid = id;
            this.form = {
                date_of_meeting: "",
                time_of_meeting: "",
                place_of_meeting: "",
                sanitizedContent: "",
                agenda: "",
                financials: "",
                other: "",
                // ... other form fields
            };
            axios.get(`http://127.0.0.1:8000/api/meetings/${id}`)
                .then(response => {
                    this.edit = response.data;
                    // console.log("edit ka maamla", this.edit);
                    $('#editModal .modal-header').text(this.edit.meeting_type);
                    this.form.id = this.edit.id;
                    this.form.date_of_meeting = this.edit.date_of_meeting;
                    this.form.time_of_meeting = this.edit.time_of_meeting;
                    this.form.place_of_meeting = this.edit.place_of_meeting;
                    // this.form.content = this.edit.content;
                    this.form.sanitizedContent = this.edit.content;
                    $('#editContnet').text(this.form.sanitizedContent);
                    // console.log("form kla content", this.edit.content);
                    // const sanitizedContent = this.sanitizeHTML(this.edit.content);

                    const agendaFileURL = this.edit.agenda;
                    const agendaFileName = agendaFileURL.split('/').pop();  // Extract the file name
                    const maxLength = 20;
                    const truncatedAgendaFileName = agendaFileName.length > maxLength
                        ? agendaFileName.substring(0, maxLength - 4) + '...' + agendaFileName.slice(-4)
                        : agendaFileName;  // Truncate to 15 characters
                    this.form.agenda = truncatedAgendaFileName;

                    const financialsFileURL = this.edit.financials;
                    const financialsFileName = financialsFileURL.split('/').pop();  // Extract the file name
                    const truncatedDinancialsFileName = financialsFileName.length > maxLength
                        ? financialsFileName.substring(0, maxLength - 4) + '...' + financialsFileName.slice(-4)
                        : financialsFileName;  // Truncate to 15 characters
                    this.form.financials = truncatedDinancialsFileName;

                    if (this.edit.other) {
                        const otherFileUrl = this.edit.other;
                        const otherFileName = otherFileUrl.split('/').pop();
                        const truncatedOtherFileName = otherFileName.length > maxLength ? otherFileName.substring(0, maxLength - 4) + '...' + otherFileName.slice(-4) : otherFileName;
                        this.form.other = truncatedOtherFileName;
                    } else {
                        this.form.other = 'Unavailable';
                    }


                })
            $('#editModal').modal('show');

        },

        minutesForm(newid) {

            if (this.isMinutesFormSubmitted) {
                // If the form is already submitted, do nothing
                return;
            }

            if (!this.minutesFormData.minutes_content.trim()) {
                this.minutes_content_error = 'Please enter content in CKEditor.';
                return;  // Stop form submission
            } else {
                this.minutes_content_error = '';
            }

            if (!this.$refs.minutes_file.files[0]) {
                this.minutes_file_error = 'Please select a file.';
                return;  // Stop form submission
            } else {
                this.minutes_file_error = '';
            }

            const minutesFormData = new FormData();
            minutesFormData.append('minutes_content', this.minutesFormData.minutes_content)

            if (this.$refs.minutes_file.files[0]) {
                minutesFormData.append('minutes_file', this.$refs.minutes_file.files[0]);
            }
            if (this.$refs.minutes_other) {
                const minutesOtherFile = this.$refs.minutes_other.files[0];
                minutesFormData.append('minutes_other', minutesOtherFile || '');  // Append an empty string if otherFile is null
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            axios.patch(`http://127.0.0.1:8000/api/meetings/${newid}/`, minutesFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    this.submitted = true;
                    this.isMinutesFormSubmitted = true;
                    console.log("Sameer Submitted SUccessfully", response.data);
                    this.minutesErrors = {};


                    // Reset input fields
                    this.minutesFormData.minutes_content = '';
                    this.$refs.minutes_file.value = '';
                    this.$refs.minutes_other.value = '';

                    // Reset error messages
                    this.minutesErrors = {};
                    this.minutes_content_error = '';
                    this.minutes_file_error = '';
                    location.reload();
                })
                .catch(error => {
                    console.log("Minutes ka Error", error);

                })


            // $('#date').text(this.singleMeeting.date_of_meeting);
        },
        handleFileChange1(event) {
            this.minutes_other = event.target.files[0];
        },

        sanitizeHTML(html) {
            // Use DOMPurify to sanitize HTML content
            return DOMPurify.sanitize(html);

        },


    },
});



// MEETING CREATION
new Vue({
    el: "#meetingApp",
    data: {
        selectedMeetingType: '',
        // meetingTypeValidation: {
        error: false,
        message: '',
        // },
        formData: {
            meeting_type: '',
            date_of_meeting: '',
            time_of_meeting: '',
            place_of_meeting: '',
            agenda: null,
            financials: null,
            other: null,
            content: '',
        },
        selectedOptionText: '',
        toggleSelectValue: '',
        meeting_type_error: '',
        dateOfMeetingError: '',
        timeOfMeetingError: '',
        placeOfMeetingError: '',
        agendaError: '',
        financialsError: '',
        contentError: '',
        submitted: false,
        error: {},
        errors: {},
        meetingTypeChoices: [],
    },
    mounted() {
        const initialContent =
            `
        <b>NOTICE - ___________________ MEETING</b><br>
        Notice is hereby given that the 5th _______________ of all primary members of ____________________________________________, will be held on _______, the ____ day of ________ at ______ ___ at the ____________________________ to transact the following agenda. <br><br>
        <b>Agenda</b>
        <ol class="m-0 p-0">
            <li>Agenda 1</li>
            <li>Agenda 2</li>
            <li>Agenda 3</li>
        </ol>

        <b>Note: </b><br>(a) In case any points need to be added or discussed, please provide in writing to society bearer at least seven days before AGM. <br>
        (b)  No holder of Power of Attorney or proxy eligible to attend the AGM Meeting.
        `;
        ClassicEditor
            .create(document.querySelector('#editor'), {
                contentStyles: {
                    color: 'black',
                    'font-family': 'Calibri, sans-serif'
                },
                // data: {
                //     value: initialContent
                // }
            })
            .then(editor => {

                editor.setData(initialContent);
                // Set the height dynamically
                const editorElement = editor.ui.getEditableElement();
                // editorElement.style.height = '400px';

                // Listen for the CKEditor change event and update formData.content
                editor.model.document.on('change:data', () => {
                    this.formData.content = editor.getData();
                });
            })
            .catch(error => {
                console.error(error);
            });
    },

    methods: {
        get_meetingtype(event) {
            const selectedOptionText = event.target.options[event.target.selectedIndex].text;
            // console.log("type:", this.selectedOptionText);

        },
        submitForm() {
            this.errors = {};


            // validateMeetingType() {
            if (!this.selectedMeetingType) {
                console.log("Meeting type present");
            } else {
                this.meetingTypeValidation.error = false;
                this.meetingTypeValidation.message = '';
            }
            // }

            // if (!this.selectedMeetingType) {
            //     this.meetingTypeValidation.error = true;
            //     this.meetingTypeValidation.message = 'Please select a meeting type.';
            //     return;
            // } else {
            //     this.meetingTypeValidation.error = true;
            // }


            if (!this.formData.content.trim()) {
                this.contentError = 'Please enter content in CKEditor.';
                return;  // Stop form submission
            } else {
                this.contentError = '';
            }

            this.selectedOptionText = this.$refs.meeting_type.options[this.$refs.meeting_type.selectedIndex].text;
            console.log("meeting type===>", this.formData.meeting_type);

            const formData = new FormData();
            formData.append('meeting_type', this.selectedOptionText);
            formData.append('date_of_meeting', this.formData.date_of_meeting);
            formData.append('time_of_meeting', this.formData.time_of_meeting);
            formData.append('place_of_meeting', this.formData.place_of_meeting);
            formData.append('agenda', this.formData.agenda);
            formData.append('financials', this.formData.financials);
            formData.append('content', this.formData.content);
            formData.append('meeting_type', this.formData.meeting_type);
            if (this.$refs.otherInput) {
                const otherFile = this.$refs.otherInput.files[0];
                formData.append('other', otherFile || '');
            }


            // for (const key in this.formData) {
            //     if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
            //         console.log(key);
            //         formData.append(key, this.formData[key]);
            //     }
            // }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/meetings/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {

                    this.submitted = true;

                    console.log("Form Submitted Successfully", response.data);
                    location.reload();
                })
                .catch(error => {
                    // console.log("form ka data",formData)
                    // console.log("form 2ka data", error)
                    // this.errors = error.response.data
                    // console.log("Error: ->", error.response.data);
                    this.error = error.response.status;

                    if (error.response && error.response.status === 400 && error.response.data) {
                        // console.log("============================errors.date_of_meeting");
                        // console.log(error.response.data.date_of_meeting);
                        // console.log(error.response.status);
                        // console.log(error.response.data);

                        if (error.response.data.date_of_meeting) {
                            this.dateOfMeetingError = error.response.data.date_of_meeting.join('');
                            // console.log("METING========", this.dateOfMeetingError);
                        } else {
                            this.dateOfMeetingError = '';
                        }

                        if (error.response.data.meeting_type) {
                            this.meeting_type_error = error.response.data.meeting_type.join('');
                        } else {
                            this.meeting_type_error = '';
                        }

                        if (error.response.data.time_of_meeting) {
                            this.timeOfMeetingError = error.response.data.time_of_meeting.join('');
                        } else {
                            this.timeOfMeetingError = '';
                        }

                        if (error.response.data.place_of_meeting) {
                            this.placeOfMeetingError = error.response.data.place_of_meeting.join('');
                        } else {
                            this.placeOfMeetingError = '';
                        }

                        if (error.response.data.agenda) {
                            this.agendaError = error.response.data.agenda.join('');
                        } else {
                            this.agendaError = '';
                        }

                        if (error.response.data.financials) {
                            this.financialsError = error.response.data.financials.join('');
                        } else {
                            this.financialsError = '';
                        }

                        if (error.response.data.content) {
                            this.contentError = error.response.data.content.join('');
                        } else {
                            this.contentError = '';
                        }

                        // if(error.response.other) {
                        //     this.errors.other = error.response.data.other[0];
                        // }
                        // this.error = 'Please fix the error';
                    } else if (error.response && error.response.status) {
                        this.error = `Error: ${error.response.status}`;
                    } else {
                        this.error = 'An error occurred while submitting the form.';
                    }
                });
        },
        handleFileChange() {
            this.formData.agenda = this.$refs.agendaInput.files[0];
            this.formData.financials = this.$refs.financialsInput.files[0];
            // this.formData.other = this.$refs.other.files[0];
        },
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/api/get-meeting-type-choices/')
        .then(response => {
            this.meetingTypeChoices = response.data;
        })
        .catch(error => {
            console.error('Error fetching meeting type choices:', error);
    });

    }
});




// ATTANDANCE KA SERACH YAHA HAI
// $(document).ready(function () {
//     // Save the original table content for resetting
//     var originalTableContent = $('#dataTable tbody').html();

//     // Function to filter table based on search input
//     function filterTable() {
//         var searchText = $('#searchInput').val().toLowerCase();

//         // Reset the table to its original state if the search input is empty
//         if (searchText === '') {
//             $('#dataTable tbody').html(originalTableContent);
//             return;
//         }

//         // Filter the rows based on the search input
//         $('#dataTable tbody tr').filter(function () {
//             $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
//         });
//     }

//     // Attach onchange event to the search input
//     $('#searchInput').on('input', function () {
//         filterTable();

//         $('#clearSearchInput').toggle(!!$(this).val());
//     });

//     $('#clearSearchInput').on('click', function () {
//         // Clear the input value
//         $('#searchInput').val('').trigger('input');
//     });
// });



/* ====================== DATATABLE ============================== */
// MEMBER TABLE SCRIPT
$(document).ready(function () {
    // datatable_columns_id = $('datatable_columns_id').val()
    let get_datatable_columns
    get_datatable_columns = [0, 1, 2, 3]

    if(datatable_columns){
        get_datatable_columns = datatable_columns;
    }

    // Define a custom filter function
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            // Customize this logic based on your needs
            var customStatus = data[1]; // Assuming the status is in the third column (adjust as needed)

            // Get the selected value from the dropdown
            var selectedStatus = $('#statusFilterDropdown').val();
            // console.log("selectedStatus==========", selectedStatus)

            if (selectedStatus === 'Active') {
                return customStatus === 'Active';
            } else if (selectedStatus === 'Inactive') {
                return customStatus === 'Inactive';
            }
            return true;
            // Apply the filter based on the selected status

        }
    );
    var table = $('#example').DataTable({
        // dom: 'Bfrtip', // Include the buttons extension
        "dom": '<"dt-buttons"Br><"clear">ftipl',         //Qlfrtip
        // buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        responsive: true,

        buttons: [
            {
                extend: 'colvis',
                text: 'More Column',
                postfixButtons: [
                    'colvisRestore'
                ]
            },
            {
                extend: 'searchBuilder',
                text: 'Filter'
            },
            {
                extend: 'print',
                exportOptions: {
                    // columns: ':visible',
                    columns: ':visible:not(.exclude-print)', // Exclude columns with the class 'exclude-print'
                    modifier: { search: 'applied', order: 'applied' },

                }
            },
            {
                extend: 'print',
                text: 'Print All',
                exportOptions: {
                    columns: '*:not(.exclude-print)' // Exclude columns with the class 'exclude-print'
                    // modifier: { search: 'applied', order: 'applied' },

                }
            },


        ],

        order: [],
        "stripeClasses": [],

        columnDefs: [

            { "visible": true, "targets": get_datatable_columns },
            { "visible": false, "targets": '_all' },
        ],
        fixedColumns: {
            left: 2
        },
        // "paging": true,
        // 'pageLength': '5',
        pagingType: "simple",
        paginate: {
            previous: "<",
            next: ">"
        },
        scrollCollapse: false,
        scrollX: true
    });

    let statusDD = $(
        '<select class="dt-button ms-2 dt-button-custom dataTable-Text" id="statusFilterDropdown"><option value="all">All</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select>')
        .on('change', function () {
            table.draw();
        });

    $('#example_filter').append(statusDD);

    // Set the DataTable info text to be centered
    $('#example_info').css({
        'text-align': 'center',
        'position': 'relative',
        'left': '40%',
        'padding-top': '20px',
        // 'margin-right': 'auto',
        'display': 'block'
    });

    // Adjust the info text position when the table is redrawn
    table.on('draw.dt', function () {
        $('#example_info').css({
            'text-align': 'center',
            'margin-left': 'auto',
            'margin-right': 'auto'
        });
    });


});