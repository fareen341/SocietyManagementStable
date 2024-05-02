
$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);


    // $(".next").click(function (e) {
    $("#nextBtn, #nextBtn2, #nextBtn3, #redirectToMember, #redirectToShares, #hLoan, #redirectToGst, #addGstNext").click(function (e) {
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
        updateWingModal() {
            alert("calling");
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/wing-flat/')
            .then(response => {
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

            society_id = document.getElementById('society_id')

            if(society_id){
                society_id = society_id.value;
                axios.patch(`http://127.0.0.1:8000/api/society-creation/${society_id}/`, this.formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        // console.log("RESPONSE->", response.data);
                    })
                    .catch(error => {
                        this.errors = error.response.data;
                    });
            }
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
        society_id = document.getElementById('society_id');
        if(society_id){
            society_id = society_id.value;
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
        }
        // const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        // myModal.show();
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
                // console.log("Response->", response.data);
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
        submitBankUpdatedData(id) {
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
                    console.log("Error Submitting:", this.errors);
                });
        },
        deleteBank(id) {
            console.log("id====", id);
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.delete(`http://127.0.0.1:8000/api/society_bank/${id}/`)
                .then(response => {
                    console.log("Form Submitted:", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors);
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
        homeLoanData: {
            bank_loan_status: ''
        },
        members: [],
        errors: {},
        flatData: {},
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
        // homeLoanData: {},
        gstData: {},
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
        addNewNomineeMemberName: '',
        addNomineeError: {},
        flat_status: [],
        flatFormData: {},

        // Not Found Error Msg:
        flatDataFoundErrorMsg: {},
        sharesDataNotFoundErrorMsg: {},
        homeLoanDataNotFoundMsg: {},
        gstDataNotFoundMsg: {},


        // Flat Name
        flatName: '',

        // Error
        newErrors: {},
        ownership_error: '',
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
        memberObjectNotFoundvalidation(){
            // TO BE CONTINUE...
        },
        viewMemberData(id, flat_id, flat_name) {
            // this.memberObjectNotFoundvalidation();
            this.flatName = flat_name;
            $('#viewMemberModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/flat_detail/${flat_id}`)
                .then(response => {
                    this.flatData = response.data;
                    console.log("FLAT STATUS1111111111===========000000000000000000", this.flatData);
                })
                .catch(error => {
                    console.error('Error fetching data S1111111111===========0000000000000000:', error.response.data.error);
                    this.flatData = false;
                    this.flatDataFoundErrorMsg = error.response.data.error;
                    // console.log("FLAT DETAILS====?????", this.flatData);
                });

            axios.get(`http://127.0.0.1:8000/api/members/${id}`)
                .then(response => {
                    this.memberData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching members data:', error);
                });

            axios.get(`http://127.0.0.1:8000/api/home-loan/${id}`)
                .then(response => {
                    this.homeLoanData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.homeLoanData = false;
                    this.homeLoanDataNotFoundMsg = error.response.data.error;
                });

            axios.get(`http://127.0.0.1:8000/api/shares/${id}`)
                .then(response => {
                    this.sharesData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.sharesData = false;
                    this.sharesDataNotFoundErrorMsg = error.response.data.error;
                });

            axios.get(`http://127.0.0.1:8000/api/flat-gst/${id}`)
                .then(response => {
                    this.gstData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.gstData = false;
                    this.gstDataNotFoundMsg = error.response.data.error;
                });

            axios.get(`http://127.0.0.1:8000/api/vehicle/${id}/`)
                .then(response => {
                    this.vehicleData = response.data;
                    console.log("VEHICLE ID=>>---------------->>>->>>", response.data.length > 0);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        editMemberData(id, wing_flat, flat_name) {
            this.wing_flat = wing_flat;
            this.flatName = flat_name;
            $('#editMemberModal').modal('show');
            console.log("id:===", this.wing_flat);
            // FETCH FLAT DETAILS
            axios.get(`http://127.0.0.1:8000/api/flat_detail/${this.wing_flat}/`)
                .then(response => {
                    this.flatFormData = response.data;
                    console.log("Flat EDIT MODAL===>", this.flatFormData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.flatFormData = {};
                });

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
                        bank_loan_status: ''
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
                    toastr.success(response.message, "Shares Added Successfully!");
                    $('#editMemberModal').modal('hide');
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        updateSharesData(id) {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if(key !== 'date_of_cessation'){
                        formData.append(key, this.formData[key]);
                    }
                }
            }
            axios.patch(`http://127.0.0.1:8000/api/shares/${id}/`, formData)
                .then(response => {
                    toastr.success(response.message, "Shares Updated Successfully!");
                    $('#editMemberModal').modal('hide');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitFlatDetailForm(){
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            const flatFormSubmit = new FormData();
            for (const key in this.flatFormData) {
                if (Object.prototype.hasOwnProperty.call(this.flatFormData, key)) {
                    console.log(key);
                    flatFormSubmit.append(key, this.flatFormData[key]);
                }
            }
            axios.patch(`http://127.0.0.1:8000/api/flat_detail/${this.wing_flat}/`, flatFormSubmit)
                .then(response => {
                    console.log("Flat data uPdated", response.data);
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
                    toastr.success(response.message, "Home Loan Added Successfully!");
                    $('#editMemberModal').modal('hide');
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error: ->", this.errors);
                });
        },
        addNomineeOnEdit(member_id, member_name) {
            this.addNewNomineeMemberId = member_id;
            this.addNewNomineeMemberName = member_name;
            $('#editMemberModal').modal('hide');
            $('#addNomineeModal').modal('show');
        },
        openMemberModal(){
            $('#addNomineeModal').modal('hide');
            $('#editMemberModal').modal('show');
        },
        addNewData(newData) {
            /* THIS FUNCTION GETS CALL TO UPDATE THE NOMINEES WITHOUT PAGE REFRESH */
            const memberData = this.memberformData.find(data => data.id === newData.member_name);
            if (memberData) {
                memberData.nominees.push(newData);
            }
            $('#addNomineeModal').modal('hide');
            $('#editMemberModal').modal('show');
        },
        addNomineeOnClick(member_id) {
            this.errors = {};
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
                    this.addNewData(response.data);
                    toastr.success(response.message, "Nominee Added!");
                })
                .catch(error => {
                    this.errors = error.response.data;
                    console.log("Errors -->", this.errors);
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
                    toastr.success(response.message, "GST Data Added Successfully!");
                    $('#editMemberModal').modal('hide');
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error: ->", error.response.data.folio_number[0]);
                });
        },
        loanFormSubmit(id) {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            const formData = new FormData();
            for (const key in this.homeLoanData) {
                if (Object.prototype.hasOwnProperty.call(this.homeLoanData, key)) {
                    if(key !== 'date_of_cessation'){
                        formData.append(key, this.homeLoanData[key]);
                    }
                }
            }
            axios.patch(`http://127.0.0.1:8000/api/home-loan/${id}/`, formData)
                .then(response => {
                    toastr.success(response.message, "Home Loan Updated Successfully!");
                    $('#editMemberModal').modal('hide');
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
                    if(key !== 'date_of_cessation'){
                        formData.append(key, this.gstData[key]);
                    }
                }
            }
            axios.patch(`http://127.0.0.1:8000/api/flat-gst/${id}/`, formData)
                .then(response => {
                    toastr.success(response.message, "GST Data Updated Successfully!");
                    $('#editMemberModal').modal('hide');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        vehicleEditSubmit() {
            let successfulSubmissions = 0;
            let failedSubmissions = 0;
            this.vehicleData.forEach((form, index) => {
                const formData = new FormData();

                const payload = {
                    wing_flat: this.formData.wing_flat,
                    parking_lot: form.parking_lot,
                    vehicle_type: form.vehicle_type,
                    vehicle_number: form.vehicle_number,
                    vehicle_brand: form.vehicle_brand,
                    sticker_number: form.sticker_number,
                    // chargable: form.chargable ? form.chargable : '',
                    chargable: form.select_charge === 'no' ? '' : form.chargable,
                    select_charge: form.select_charge,
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
                        successfulSubmissions++;
                        if (successfulSubmissions === this.vehicleData.length) {
                            toastr.success(response.message, "Vehicle Data Updated Successfully!");
                            $('#editMemberModal').modal('hide');
                        }
                    })
                    .catch(errors => {
                        failedSubmissions++;
                        toastr.error("Please Correct All Errors!");
                        console.log("Error: ", errors);
                    });
            });
        },
        addVehicleOnEditModal() {
            this.forms = [{}];
            $('#editMemberModal').modal('hide');
            $('#addVehicleModal').modal('show');
        },
        hideVehicleOpenMemberModal(){
            $('#addVehicleModal').modal('hide');
            $('#editMemberModal').modal('show');
        },
        addVehicleOnEditButton() {
            let successfulSubmissions = 0;
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
                    select_charge: form.select_charge,
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
                        successfulSubmissions++;
                        if (successfulSubmissions === this.forms.length) {
                            toastr.success(response.message, "Vehicle Data Added Successfully!");
                            $('#addVehicleModal').modal('hide');
                            $('#editMemberModal').modal('show');
                            this.vehicleData.push(response.data);
                        }
                    })
                    .catch(errors => {
                        console.error('Error submitting form data:', errors);
                        this.errors = errors.response.data.errors;
                    });
            });
        },
        calculateAge(admissionDate) {
            const today = new Date();
            const admissionDateObj = new Date(admissionDate);

            let age = today.getFullYear() - admissionDateObj.getFullYear();
            const monthDiff = today.getMonth() - admissionDateObj.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < admissionDateObj.getDate())) {
                age--;
            }
            return age;
        },
        submitEditedMemberData() {
            let successfulSubmissions = 0;
            let totalPercent = 0;
            this.ownership_error = '';
            this.errors = {};
            this.newErrors = {};
            let showToastrError = true;

            let cessation = ''
            this.memberformData.forEach((form, index) => {
                if (form.date_of_cessation) {
                    cessation = form.date_of_cessation;
                }
            });

            this.memberformData.forEach((form, index) => {
                if (form.ownership_percent) {
                    totalPercent += parseFloat(form.ownership_percent);
                }
            });

            if (totalPercent > 100){
                this.ownership_error = 'Ownership exceeding! Addition of all ownership % should be 100 for this flat!';
                toastr.error("Please Correct All Errors!");
                return;
            }

            this.memberformData.forEach((form, index) => {
                const formData = new FormData();
                delete form.sales_agreement;
                delete form.other_attachment;
                const payload = {};
                for (const key in form) {
                    if (Object.prototype.hasOwnProperty.call(form, key)) {
                        if (key == 'date_of_cessation') {
                            payload[key] = cessation
                        }
                        if(key === 'date_of_admission'){
                            payload['age_at_date_of_admission'] = this.calculateAge(form[key]);
                        }
                        if (form[key] !== null) {
                            payload[key] = form[key];
                        }
                    }
                }
                formData.append('data', JSON.stringify(payload));


                const refName = 'sales_agreement_' + index;
                const inputElement = this.$refs[refName];
                if (inputElement && inputElement.length > 0) {
                    formData.append('sales_agreement', inputElement[0].files[0]);
                }

                const otherDoc = 'other_attachment_' + index;
                const inputElementDoc = this.$refs[otherDoc];
                if (inputElementDoc && inputElementDoc.length > 0) {
                    formData.append('other_attachment', inputElementDoc[0].files[0]);
                }

                axios.defaults.xsrfCookieName = 'csrftoken';
                axios.defaults.xsrfHeaderName = 'X-CSRFToken';
                axios.patch(`http://127.0.0.1:8000/api/members/${form.id}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        this.$set(this.newErrors, index, null);
                        successfulSubmissions++;
                        if (successfulSubmissions === this.memberformData.length) {
                            toastr.success(response.message, "Member Updated Successfully!");
                            $('#editMemberModal').modal('hide');
                            setTimeout(function() {
                                location.reload();
                            }, 600);
                        }
                        // Update Datatable, DONT DELETE USEFULL LATER.
                        // console.log("RESPONSE DATA===>", response.data);
                        // const index = this.members.findIndex(item => item.id === form.id);
                        // if (index !== -1) {
                        //     this.$set(this.members, index, response.data);
                        // }
                        // console.log("LOG LOG LOG", this.members);
                    })
                    .catch(error => {
                        if(showToastrError){
                            toastr.error("Please Correct All Errors!");
                            showToastrError = false;
                        }
                        this.$set(this.newErrors, index, error.response.data);
                    });
            });
        },
        addMemberData(id, flat_id, flat_name) {
            this.flatName = flat_name;
            $('#flatDropdown').val(flat_id);
            $('#selectedFlat').html(flat_name);
            $('#addMemberModal').modal('show');
        },
        memberHistoryData(wing_flat, flat_name) {
            this.flatName = flat_name;
            $('#memberHistoryModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/history/?wing_flat__id=${wing_flat}`)
                .then(response => {
                    if (response.data) {
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
                    console.error('Error fetching data member history data~~~~~~~~~~~~~~~~:', error);
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
            if (event.target.value == 'closed') {
                this.attach_noc = true;
            }
        },
        hasError() {},
        sliceAddress(address) {
            const words = address.split(' '); // Split the address into words
            if (words.length > 5) {
              return words.slice(0, 5).join(' ') + '...'; // Join the first 10 words and add ellipsis
            } else {
              return address; // If the address has less than 10 words, return as it is
            }
        },
        redirectToUnit(){
            window.location.href = "/unit-master";
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/members/')
            .then(response => {
                response.data.forEach(element => {
                    delete element.date_of_cessation;
                    delete element.reason_for_cessation;
                    delete element.same_flat_member_identification;
                    // delete element.wing_flat;
                    delete element.member_position;
                    delete element.nominees;
                    delete element.sales_agreement;
                    delete element.other_attachment;
                });

                this.members = response.data;
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // GET FLAT STATUS DROPDOWN
        axios.get(`http://127.0.0.1:8000/api/get_flats_status/`)
            .then(response => {
                this.flat_status = response.data;
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
        errors: {
            non_field_errors: ''
        },
        required_docs_errors: {},
        flat_having_primary_mem: true,
        ownershipError: '',
        nomError: {},
        isValid: true,
    },
    methods: {
        addForm() {
            this.forms.push({});
            this.formData.wing_flat = $('#flatDropdown').val();
            const newIndex = this.forms.length - 1;
            this.errors = this.errors.filter(error => error.index !== newIndex);
        },
        removeForm(index) {
            this.formData.wing_flat = $('#flatDropdown').val();
            this.forms.splice(index, 1);
        },
        hasError(index, field) {
            // return this.errors.some(error => error.index === index && error[field]);
        },
        getError(index, field) {
            // const error = this.errors.find(error => error.index === index);
            // return error ? error[field][0] : '';
        },
        validateNominees(fieldName, form, index) {
            if (!form[fieldName]) {
              // Initialize nomError for this form if it doesn't exist
              if (!this.nomError[index]) {
                this.$set(this.nomError, index, {});
              }
              // Update the error message for the field
              this.$set(this.nomError[index], fieldName, `This field is required`);
              this.isValid = false;
            }
        },
        calculateAge(admissionDate) {
            const today = new Date();
            const admissionDateObj = new Date(admissionDate);

            let age = today.getFullYear() - admissionDateObj.getFullYear();
            const monthDiff = today.getMonth() - admissionDateObj.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < admissionDateObj.getDate())) {
                age--;
            }

            return age;
        },
        submitMembers(addAnother) {
            this.formData.wing_flat = $('#flatDropdown').val();

            // VALIDATION FOR NOMINEES:
            this.nomError = {};

            this.forms.forEach((form, index) => {
                this.validateNominees('nominee_name', form, index);
                this.validateNominees('date_of_nomination', form, index);
                this.validateNominees('relation_with_nominee', form, index);
                this.validateNominees('nominee_sharein_percent', form, index);
                this.validateNominees('nominee_dob', form, index);
                this.validateNominees('nominee_aadhar_no', form, index);
                this.validateNominees('nominee_pan_no', form, index);
                this.validateNominees('nominee_email', form, index);
                this.validateNominees('nominee_address', form, index);
                this.validateNominees('nominee_state', form, index);
                this.validateNominees('nominee_pin_code', form, index);
                this.validateNominees('nominee_contact', form, index);
            });

            const payload = {};
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    if (this.formData[key] !== null) {
                        if(key === 'date_of_admission'){
                            payload['age_at_date_of_admission'] = this.calculateAge(this.formData[key]);
                        }
                        payload[key] = this.formData[key];
                    }
                }
            }
            payload['nominees'] = this.forms;
            this.formData.append('data', JSON.stringify(payload));

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/members/', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    toastr.success(response.message, "Member Added Successfully!");
                    if(addAnother === true){
                        setTimeout(function() {
                            location.reload();
                        }, 600);
                    }else{
                        this.nextAction();
                    }
                })
                .catch(error => {
                    this.errors = error.response.data;
                    console.log("Member form error!", this.errors);
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
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        $('#addMemberModal').on('hidden.bs.modal', () => {
            this.errors = {};
            this.nomError = {};
            this.formData = {};
        });

    },
});



// Add Flat Details
new Vue({
    el: '#flatDetailVue',
    data: {
        flat_status: [],
        units: [],
        formData: {},
        errors: {},
        attach_noc: false,
    },
    methods: {
        submitFlatDetailForm() {
            this.errors = {};
            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    formData.append(key, this.formData[key]);
                }
            }

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/flat_master_detail/', formData)
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                    this.nextAction();
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error: ->", this.errors);
                });
            // $("#redirectToMember").trigger("click");
        },
        loanStatus(event) {
            this.attach_noc = false;
            if (event.target.value == 'yes') {
                this.attach_noc = true;
            }
        },
        nextAction() {
            console.log('Form data submitted successfully. Proceeding to the next action.');
            $("#redirectToMember").trigger("click");
        },
    },
    mounted() {
        // GET FLATS DROPDOWN
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // GET FLAT STATUS DROPDOWN
        axios.get(`http://127.0.0.1:8000/api/get_flats_status/`)
            .then(response => {
                this.flat_status = response.data;
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
        formData: {},
        formInput: new FormData(),
        houseHelp: [],
        errors: {},
        houseHelpData: {},
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
                    toastr.success(response.message, "House Help Data Added Successfully!");
                    $('#houseHelpCreation').modal('hide');
                    // this.tenantData.push(newData);
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
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
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitForm(id) {
            this.formInput.append('transfer_to_folio_no', this.formData.transfer_to_folio_no);
            this.formInput.append('house_help_name', this.formData.house_help_name)
            this.formInput.append('house_help_pan_number', this.formData.house_help_pan_number)
            this.formInput.append('house_help_contact', this.formData.house_help_contact)
            this.formInput.append('house_help_aadhar_number', this.formData.house_help_aadhar_number)
            this.formInput.append('house_help_address', this.formData.house_help_address)
            this.formInput.append('house_help_city', this.formData.house_help_city)
            this.formInput.append('house_help_state', this.formData.house_help_state)
            this.formInput.append('house_help_pin', this.formData.house_help_pin)
            this.formInput.append('other_document_specifications', this.formData.other_document_specifications)

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/househelp/${id}/`, this.formInput, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    this.submitted = true;
                    toastr.success(response.message, "House Help Data Updated Successfully!");
                    $('#houseHelpUpdation').modal('hide');
                    // Refresh Data
                    // setTimeout(function() {
                    //     location.reload();
                    // }, 600);
                    const index = this.houseHelp.findIndex(item => item.id === id);
                    if (index !== -1) {
                        this.$set(this.houseHelp, index, response.data);
                    }
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
                    toastr.success(response.message, "House Help Data Added Successfully!");
                    $('#houseHelpCreation').modal('hide');
                    // TO ADD DATA IN DATATABLE, WITHOUT PAGE REFRESH:
                    // this.houseHelp.push(response.data);
                    setTimeout(function() {
                        location.reload();
                    }, 600);
                })
                .catch(error => {
                    this.errors = error.response.data
                });
        },
        clearErrors() {
            this.errors = {};
        },
        handleFileChange(event, refName) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.formInput.append(refName, selectedFile);
            }
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

        $('#houseHelpUpdation, #houseHelpCreation').on('hidden.bs.modal', () => {
            this.clearErrors();
            this.formData = {}
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
                    $('#houseHelpAllocationCreation').modal('hide');
                    toastr.success(response.message, "House Help Allocated Successfully!");
                    setTimeout(function() {
                        location.reload();
                    }, 600);
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
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        $('#houseHelpAllocationUpdation, #houseHelpAllocationCreation').on('hidden.bs.modal', () => {
            this.clearErrors();
            this.formData = {};
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
        updateTenant(tenantIdToUpdate) {
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
                    toastr.success(response.message, "Tenent Updated Successfully!");
                    $('#tenentUpdateModal').modal('hide');

                    // Update the tenantData after successful update
                    // const index = this.tenantData.findIndex(item => item.id === tenantIdToUpdate);
                    // if (index !== -1) {
                    //     this.$set(this.tenantData, index, response.data);
                    // }
                    setTimeout(function() {
                        location.reload();
                    }, 600);
                })
                .catch(error => {
                    // this.errors = error.response.data
                    console.log("Error Submitting:", error);
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
        addNewData(newData) {
            // Logic to add new data to the DataTable

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
                    toastr.success(response.message, "Tenent Created!");
                    $('#tenentCreation').modal('hide');
                    setTimeout(function() {
                        location.reload();
                    }, 600);
                    // TO REFRESH DATATABLE
                    // this.tenantData.push(response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors);

                });
        },
        handleFileChange(event, refName) {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                this.formInput.append(refName, selectedFile);
            }
        },
        clearErrors() {
            this.errors = {};
        },
        sliceAddress(address) {
            const words = address.split(' '); // Split the address into words
            if (words.length > 5) {
              return words.slice(0, 5).join(' ') + '...'; // Join the first 10 words and add ellipsis
            } else {
              return address; // If the address has less than 10 words, return as it is
            }
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
        getOwnerName(event) {
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
                    // delete newResponse.tenant_noc;
                    // delete newResponse.aadhar_pan;
                    // delete newResponse.member_name;
                    // delete newResponse.tenant_name;
                    this.formData = newResponse;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        updateTenant() {
            this.formInput.append('tenant_to_date', this.formData.tenant_to_date ? this.formData.tenant_to_date : '');
            this.formInput.append('tenant_from_date', this.formData.tenant_from_date ? this.formData.tenant_from_date : '');

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/tenant_allocation/${this.tenantIdToUpdate}/`, this.formInput)
                .then(response => {
                    toastr.success(response.message, "Tenent Allocation Updated Successfully!");
                    $('#tenentUpdateModal').modal('hide');
                    setTimeout(function() {
                        location.reload();
                    }, 600);

                    // Update the tenantData after successful update
                    // const index = this.tenantData.findIndex(item => item.id === this.tenantIdToUpdate);
                    // if (index !== -1) {
                    //     const existingItem = this.tenantData[index];
                    //     existingItem.tenant_to_date = response.data.tenant_to_date;
                    //     existingItem.tenant_from_date = response.data.tenant_from_date;
                    //     existingItem.tenant_noc_filename = response.data.tenant_noc_filename;
                    //     existingItem.tenant_agreement = response.data.tenant_agreement;
                    //     this.$set(this.tenantData, index, existingItem);
                    // }

                    // SOLVED ERROR OF SAME FILE GETTING SAVED ON EACH UPDATE MODAL
                    // const fileInput = this.$refs.tenant_agreement;
                    // if (fileInput) {
                    //     fileInput.value = ''; // Reset file input value to clear selected file
                    // }
                    // this.formInput = new FormData();
                })
                .catch(error => {
                    this.errors = error.response
                    console.log("Error Submitting:", this.errors);
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
                    toastr.success(response.message, "Tenent Allocated Successfully!");
                    $('#tenentCreation').modal('hide');
                    // this.tenantData.push(newData);
                    setTimeout(function() {
                        location.reload();
                    }, 600);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors);

                });
        },
        handleFileChange(event, refName) {
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
                // delete response.data.tenant_noc_filename;
                this.tenantData = response.data;
                // let newResponse = response.data

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
        formData: {},
        houseHelpAllocation: [],
        errors: {},
        houseHelpAllocationData: {},
    },
    methods: {
        editRequestedData(id) {
            $('#houseHelpAllocationUpdation').modal('show');
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
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        submitHoseHelpAllocationForm(id) {
            const formData = new FormData();
            formData.append('house_help_period_from', this.formData.house_help_period_from);
            formData.append('house_help_period_to', this.formData.house_help_period_to);

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/househelpallocation/${id}/`, formData)
                .then(response => {
                    this.submitted = true;
                    toastr.success("House Help Allocatted Successfully!");
                    $('#houseHelpAllocationUpdation').modal('hide');

                    // UPDATING JUST FROM AND TO DATE ON DATATABLE
                    const index = this.houseHelpAllocation.findIndex(item => item.id === id);
                    if (index !== -1) {
                        const existingItem = this.houseHelpAllocation[index];
                        existingItem.house_help_period_from = response.data.house_help_period_from;
                        existingItem.house_help_period_to = response.data.house_help_period_to;
                        this.$set(this.houseHelpAllocation, index, existingItem);
                    }
                })
                .catch(error => {
                    this.errors = error.response.data;
                    console.log("Error: ", this.errors);
                });
        },
        submitHouseHelp() {
            $('#houseHelpCreation').modal('show');
            const formData = new FormData();
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
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
});


// HOUSE HELP
// new Vue({
//     el: '#househelpcreationForm',
//     data: {
//         formData: {
//             house_help_name: '',
//             house_help_pan_number: '',
//             house_help_contact: '',
//             house_help_aadhar_number: '',
//             house_help_address: '',
//             house_help_city: '',
//             house_help_state: '',
//             house_help_pin: '',
//             other_doc: null,
//             other_document_specifications: '',
//         },
//         submitted: false,
//         error: null,
//         errors: {},
//     },
//     methods: {
//         // submitHouseHelp() {
//         //     const formData = new FormData();
//         //     this.errors = {};
//         //     for (const key in this.formData) {
//         //         if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
//         //             if (this.formData[key] !== null) {
//         //                 formData.append(key, this.formData[key]);
//         //             }
//         //         }
//         //     }
//         //     if (this.$refs.house_help_pan_doc.files[0]) {
//         //         this.formData.house_help_pan_doc = this.$refs.house_help_pan_doc.files[0]
//         //     }
//         //     if (this.$refs.house_help_aadhar_doc.files[0]) {
//         //         this.formData.house_help_aadhar_doc = this.$refs.house_help_aadhar_doc.files[0]
//         //     }
//         //     if (this.$refs.other_doc.files[0]) {
//         //         this.formData.other_doc = this.$refs.other_doc.files[0];
//         //     }
//         //     console.log("formdata", this.formData);
//         //     axios.defaults.xsrfCookieName = 'csrftoken';
//         //     axios.defaults.xsrfHeaderName = 'X-CSRFToken';
//         //     axios.post('http://127.0.0.1:8000/api/househelp/', this.formData, {
//         //         headers: {
//         //             'Content-Type': 'multipart/form-data'
//         //         }
//         //     })
//         //         .then(response => {
//         //             this.submitted = true;
//         //             toastr.success(response.message, "House Help Data Added Successfully!");
//         //             $('#houseHelpCreation').modal('hide');
//         //             this.tenantData.push(newData);
//         //         })
//         //         .catch(error => {
//         //             this.errors = error.response.data
//         //         });
//         // },
//         clearErrors() {
//             this.errors = {};
//         },
//     },
//     mounted() {
//         $('#houseHelpCreation').on('hidden.bs.modal', () => {
//             this.clearErrors();
//         });
//     }
// });


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
            minutes_content: ''
        },
        attendanceData: [],
        meetingId: '',
        currentUser: '',
        suggestion_input_data: '',
        previousSuggestions: [],
        attendanceViewData: [],
        setMeetingsData: {},
    },
    methods: {
        submitAttendance() {
            const formData = new FormData(this.$refs.submitAttendances);
            const tableData = [];
            const rows = document.querySelectorAll('#attendanceTable tbody tr');

            rows.forEach(row => {
                const flatNo = row.cells[0].innerText;
                const memberName = row.querySelector('input[name="editable-dropdown"]').value;
                // const memberName = document.getElementsByName('editable-dropdown')[0].value;
                const memberType = row.querySelector('select#member_type_dropdown').value;
                const attachment = row.querySelector('input[type="file"]').files[0];
                const attendance = row.querySelector('input[type="checkbox"]').checked;

                const formData = new FormData();

                formData.append('meeting_id', this.meetingId)
                formData.append('flat_no', flatNo)
                formData.append('member', memberName)
                formData.append('member_type', memberType)
                formData.append('attachment', attachment)
                formData.append('attendance', attendance)


                axios.defaults.xsrfCookieName = 'csrftoken';
                axios.defaults.xsrfHeaderName = 'X-CSRFToken';

                axios.post('http://127.0.0.1:8000/api/attendance/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        },
        viewMeetingDetails(id) {
            $('#viewMeetingModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/meetings/${id}`)
                .then(response => {
                    this.singleMeeting = response.data;
                    if(this.singleMeeting.date_of_meeting){
                        const date = new Date(this.singleMeeting.date_of_meeting);
                        const day = date.getDate();
                        const month = date.toLocaleString('default', { month: 'long' });
                        const year = date.getFullYear();
                        this.singleMeeting.date_of_meeting = `${day}, ${month} ${year}`;
                    }

                    if(this.singleMeeting.time_of_meeting){
                        const [hours, minutes] = this.singleMeeting.time_of_meeting.split(':');
                        let hour = parseInt(hours);
                        const period = hour >= 12 ? 'PM' : 'AM';
                        if (hour > 12) {
                            hour -= 12;
                        }
                        hour = hour.toString().padStart(2, '0');
                        this.singleMeeting.time_of_meeting = `${hour}:${minutes} ${period}`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

            axios.get(`http://127.0.0.1:8000/api/attendance/${id}`)
                .then(response => {
                    this.attendanceViewData = response.data;
                    $(document).ready(function () {
                        $('#viewAttendanceTable').DataTable();
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        },
        attendance(id) {
            this.meetingId = id;
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
            this.meetingId = id;
            this.form.meeting = id;
            $('#suggestionModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/meetings/${id}`)
                .then(response => {
                    this.meetingSuggestion = response.data;
                    $('#suggestionModal .modal-header').text(this.meetingSuggestion.meeting_type);
                })

            // PREVIOUS SUGGESTION:
            axios.get(`http://127.0.0.1:8000/api/get_previous_suggestions/${id}`)
                .then(response => {
                    // console.log('Form data submitted successfully:', response.user_id);
                    console.log("User id======", response.data.previous_suggestions);
                    this.previousSuggestions = response.data.previous_suggestions;
                })
                .catch(errors => {
                    console.error('Error submitting form data:', errors);
                });

        },
        submitSuggestionForm() {
            axios.get('http://127.0.0.1:8000/api/current_user/')
                .then(response => {
                    const suggestionData = new FormData()
                    suggestionData.append('user_id', response.data.user_id)
                    suggestionData.append('meeting_id', this.meetingId)
                    suggestionData.append('suggestions', this.suggestion_input_data)

                    // POST SUGGESTION
                    axios.defaults.xsrfCookieName = 'csrftoken';
                    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

                    axios.post('http://127.0.0.1:8000/api/suggestions/', suggestionData)
                        .then(response => {
                            toastr.success(response.message, "Suggestion Added Successfully!");
                            if (this.previousSuggestions.length > 0) {
                                this.previousSuggestions.push(response.data);
                                this.suggestion_input_data = '';
                            } else {
                                setTimeout(function() {
                                    location.reload();
                                }, 600);
                            }
                        })
                        .catch(errors => {
                            console.error('Error submitting form data:', errors);
                        });
                })
                .catch(errors => {
                    console.error('Error submitting form data:', errors);
                });
        },
        editForm(id) {
            $('#editModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/meetings/${id}`)
                .then(response => {
                    this.singleMeeting = response.data;
                })
        },

        minutesForm(id) {
            const minutesFormData = new FormData();
            minutesFormData.append('minutes_content', this.minutesFormData.minutes_content)

            if (this.$refs.minutes_file.files[0]) {
                minutesFormData.append('minutes_document', this.$refs.minutes_file.files[0]);
            }
            if (this.$refs.minutes_other) {
                const minutesOtherFile = this.$refs.minutes_other.files[0];
                minutesFormData.append('minutes_otehr_doc', minutesOtherFile || '');
            }
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            axios.patch(`http://127.0.0.1:8000/api/meetings/${id}/`, minutesFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    toastr.success(response.message, "Meetings Data Updated Successfully!");
                    $('#editModal').modal('hide');
                    setTimeout(function() {
                        location.reload();
                    }, 600);
                })
                .catch(error => {
                    console.log("Minutes ka Error", error);

                })
        },
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/meetings/')
            .then(response => {
                this.meeting = response.data;
                this.meeting.forEach((meeting, index) => {
                    // TO CHANGE THE FORMAT OF THE MEETING TIME
                    if (meeting.time_of_meeting) {
                        let formatted_time;
                        const [hours, minutes] = meeting.time_of_meeting.split(':');
                        let hour = parseInt(hours);
                        const period = hour >= 12 ? 'PM' : 'AM';
                        if (hour > 12) {
                            hour -= 12;
                        }
                        hour = hour.toString().padStart(2, '0');
                        formatted_time = `${hour}:${minutes} ${period}`;
                        this.meeting[index].time_of_meeting = formatted_time;
                    }
                });
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
            })
            .then(editor => {
                editor.setData(minutesInitialContent);
                const editorElement = editor.ui.getEditableElement();
                editor.model.document.on('change:data', () => {
                    this.minutesFormData.minutes_content = editor.getData();
                });
            })
            .catch(error => {
                console.error(error);
            });

        // ATTENDANCE API:
        axios.get('http://127.0.0.1:8000/api/get_nominees_details/')
            .then(response => {
                // this.submitted = true;
                this.attendanceData = response.data.flats;
                this.someVal = 'xyz'
            })
            .catch(error => {
                this.errors = error.response.data
            });
    },
});



// MEETING CREATION
new Vue({
    el: "#meetingApp",
    data: {
        selectedMeetingType: '',
        error: false,
        message: '',
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
        submitForm() {
            if (!this.formData.content.trim()) {
                this.contentError = 'Please enter content in CKEditor.';
                return;
            } else {
                this.contentError = '';
            }

            const formData = new FormData();
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

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/meetings/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    toastr.success(response.message, "Shares Added Successfully!");
                    setTimeout(function() {
                        location.reload();
                    }, 600);
                })
                .catch(error => {
                    console.log("Error-->",error.response)
                });
        },
        handleFileChange() {
            this.formData.agenda = this.$refs.agendaInput.files[0];
            this.formData.financials = this.$refs.financialsInput.files[0];
        },
    },
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

    if (datatable_columns) {
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




    // MARK ATTENDANCE DATATABLE
    var attendanceTable = $('#attendanceTable').DataTable({
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

            { "visible": true, "targets": [0, 1, 2, 3, 4, 5] },
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

    // Set the DataTable info text to be centered
    $('#attendanceTable_info').css({
        'text-align': 'center',
        'position': 'relative',
        'left': '40%',
        'padding-top': '20px',
        // 'margin-right': 'auto',
        'display': 'block'
    });

    // Adjust the info text position when the table is redrawn
    attendanceTable.on('draw.dt', function () {
        $('#attendanceTable_info').css({
            'text-align': 'center',
            'margin-left': 'auto',
            'margin-right': 'auto'
        });
    });

    // VIEW ATTENDANCE DATATABEL
    var viewAttendanceTable = $('#viewAttendanceTable').DataTable({
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

            { "visible": true, "targets": [0, 1, 2, 3, 4, 5] },
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

    // Set the DataTable info text to be centered
    $('#viewAttendanceTable_info').css({
        'text-align': 'center',
        'position': 'relative',
        'left': '40%',
        'padding-top': '20px',
        // 'margin-right': 'auto',
        'display': 'block'
    });

    // Adjust the info text position when the table is redrawn
    attendanceTable.on('draw.dt', function () {
        $('#viewAttendanceTable_info').css({
            'text-align': 'center',
            'margin-left': 'auto',
            'margin-right': 'auto'
        });
    });


/* DATA LIST FUNCTIONALITY START */
    // DATA LIST OPTION JS
    // var input = document.getElementById('editable-dropdown');

    // Event listener for when the input value changes
    // input.addEventListener('input', function() {
    //     // Get the selected option
    //     var selectedOption = null;
    //     var enteredValue = input.value;
    //     var dataList = document.getElementById('options');

    //     // Loop through the options in the datalist
    //     for (var i = 0; i < dataList.options.length; i++) {
    //         // Check if the entered value matches any option value
    //         if (dataList.options[i].value === enteredValue) {
    //             selectedOption = dataList.options[i];
    //             break;
    //         }
    //     }

    //     // If a matching option is found, log its value and data-info attribute
    //     if (selectedOption) {
    //         var info = selectedOption.getAttribute('data-info');
    //         console.log('Selected option:', selectedOption.value);
    //         console.log('Info:', info);
    //     } else {
    //         console.log('Custom value entered:', enteredValue);
    //     }
    // })

    // var input = document.getElementById('editable-dropdown');

    // input.addEventListener('input', function () {
    //     var selectedOption = null;
    //     var enteredValue = input.value;
    //     var dataList = document.getElementById('options');

    //     // for (var i = 0; i < dataList.options.length; i++) {
    //     //     if (dataList.options[i].value === enteredValue) {
    //     //         var nomineeId = dataList.options[i].getAttribute('data-id');
    //     //         console.log('Selected Nominee ID:', nomineeId);
    //     //         break;
    //     //     }
    //     // }

    //     // Loop through the options in the datalist
    //     for (var i = 0; i < dataList.options.length; i++) {
    //         // Check if the entered value matches any option value
    //         if (dataList.options[i].value === enteredValue) {
    //             selectedOption = dataList.options[i];
    //             break;
    //         }
    //     }

    //     // If a matching option is found, log its value and data-info attribute
    //     var memberTypeInput = document.getElementById('member_type_dropdown');
    //     if (selectedOption) {
    //         var id = selectedOption.getAttribute('data-id');
    //         var status = selectedOption.getAttribute('data-status');
    //         console.log('Selected option:', selectedOption.value);
    //         console.log('ID:', id);
    //         console.log('Status:', status);


    //         if (status === 'secondary') {
    //             console.log("TYPE=======>>>>>>", status);
    //             memberTypeInput.value = "secondary";
    //         } else if (status === 'primary') {
    //             memberTypeInput.value = "primary";
    //         }

    //     } else {
    //         console.log('Custom value entered:', enteredValue);
    //         memberTypeInput.value = "proxy";
    //     }
    // });

/* DATA LIST FUNCTIONALITY END */

});

// UNIT MASTER (Display, Update)
new Vue({
    el: '#unitMasterVue',
    data: {
        viewUnitData: {},
        unitData: [],
        errors: {},
        flatFormData: {},
        filteredOptions: ['Yes', 'No'],
        filteredOptions: {'yes': 'Yes', 'no': 'No'},
        formData: {},
        flat_status: [],
        units: [],
        attach_noc: false,
    },
    methods: {
        submitFlatDetailForm() {
            this.errors = {};
            const formData = new FormData();
            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    formData.append(key, this.formData[key]);
                }
            }

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.post('http://127.0.0.1:8000/api/flat_master_detail/', formData)
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                    this.nextAction();
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error: ->", this.errors);
                });
            // $("#redirectToMember").trigger("click");
        },
        loanStatus(event) {
            this.attach_noc = false;
            if (event.target.value == 'yes') {
                this.attach_noc = true;
            }
        },
        editRequestedData(id) {
            $('#unitUpdateModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/flat_master_detail/${id}/`)
                .then(response => {
                    this.flatFormData = response.data;
                    console.log("Success Response:", this.flatFormData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        updateUnit(id) {
            const unitFormData = new FormData();
            for (const key in this.flatFormData) {
                if (Object.prototype.hasOwnProperty.call(this.flatFormData, key)) {
                    if (this.flatFormData[key] !== null) {
                        unitFormData.append(key, this.flatFormData[key]);
                    }
                }
            }

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.patch(`http://127.0.0.1:8000/api/flat_master_detail/${id}/`, unitFormData)
                .then(response => {
                    console.log("Form Submitted:", response.data);
                })
                .catch(error => {
                    this.errors = error.response.data
                    console.log("Error Submitting:", this.errors);
                });
        },
        viewRequestedData(id) {
            $('#unitViewModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/flat_master_detail/${id}/`)
                .then(response => {
                    this.viewUnitData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
    },
    mounted() {
        // GET FLATS DROPDOWN
        axios.get(`http://127.0.0.1:8000/api/wing/`)
            .then(response => {
                this.units = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // GET FLAT STATUS DROPDOWN
        axios.get(`http://127.0.0.1:8000/api/get_flats_status/`)
            .then(response => {
                this.flat_status = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios.get('http://127.0.0.1:8000/api/flat_detail/')
            .then(response => {
                this.unitData = response.data;
                $(document).ready(function () {
                    $('#example').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        $('#unitCreation, #unitUpdateModal').on('hidden.bs.modal', () => {
            this.errors = {};
            this.formData = {};
        });
    },
})



new Vue({
    el: '#societyHead',
    data: {
        society: {},
        error: {},
    },
    mounted() {
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.get(`http://127.0.0.1:8000/api/society-creation/`)
            .then(response => {
                this.society = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});


// Print Functionality for Registers and Form I, J
// This code is been used to print all registers and form I, J
function printTable() {
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title></title></head><body>');
    printWindow.document.write(document.getElementById('print-head').innerHTML);
    printWindow.document.write('<style>@media print { #table-container { overflow-x: visible; border: 1px solid #000;/ } .no-print { display: none } #print-head { position: fixed; top: 0; left: 0; right: 0; } .print-head-content { margin-top: 10px; padding: 0px 0px; margin-bottom: 0px; text-align: center } #heading { text-align: center;  } .cols { border: 1px solid #000; } table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #000; padding: 8px; } thead { background-color: #212529; color: white; } .add-width { width: 400px !important; } }</style>');
    printWindow.document.write(document.getElementById('table-container').innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Print Funtionality for Form I-MH
function printForm() {
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title></title></head><body>');
    printWindow.document.write(document.getElementById('print-head').innerHTML);
    printWindow.document.write(document.getElementById('formName').innerHTML);
    printWindow.document.write(document.getElementById('sectionName').innerHTML);
    printWindow.document.write('<div id="print-content">');
    printWindow.document.write(document.getElementById('formContent').innerHTML);
    printWindow.document.write('</div>');
    printWindow.document.write('<style>@media print { #table-container { overflow-x: visible; border: 1px solid #000;/ } .no-print { display: none } #print-head {display: flex; flex-direction: column; justify-content: center; align-items: center; } .print-head-content { margin-top: 10px; padding: 0px 0px; margin-bottom: 0px; text-align: center } #heading { text-align: center;  } .form-name { text-align: center;  }  table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #000; padding: 8px; } thead { background-color: #212529; color: white; } .contentss { display: flex; width: 75%; padding-left: 100px;} .www { width: 50%;} }</style>');
    printWindow.document.write(document.getElementById('table-container').innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}


// UNIT TEST VUE
new Vue({
    el: '#unitTestVue',
    data: {
        testData: [],
        formData: {},
        errors: {},
        bug_type: {},
        bug_status: {},
        review: {},
        viewTestCaseData: [],
    },
    methods: {
        addTestDetails(id) {
            const unitTestCaseData = new FormData();
            unitTestCaseData.append('test_type', this.formData.test_type);
            unitTestCaseData.append('test_description', this.formData.test_description);

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';

            if(id){
                // UPDATE DATA
                unitTestCaseData.append('test_status', this.formData.test_status);
                unitTestCaseData.append('review', this.formData.review);

                axios.patch(`http://127.0.0.1:8000/api/unit_test_api/${id}/`, unitTestCaseData)
                    .then(response => {
                        toastr.success(response.message, "Test Case Added Successfully!");
                        $('#updateTestCase').modal('hide');
                        // const index = this.testData.findIndex(item => item.id === id);
                        // if (index !== -1) {
                        //     this.$set(this.testData, index, response.data);
                        // }
                        setTimeout(function() {
                            location.reload();
                        }, 600);
                    })
                    .catch(error => {
                        this.errors = error.response.data
                        console.log("Error: ->", this.errors);
                    });
            }else{
                // ADD DATA
                axios.post('http://127.0.0.1:8000/api/unit_test_api/', unitTestCaseData)
                    .then(response => {
                        toastr.success(response.message, "Test Case Added Successfully!");
                        $('#addTestCase').modal('hide');
                        // this.testData.push(response.data);
                        setTimeout(function() {
                            location.reload();
                        }, 600);
                    })
                    .catch(error => {
                        this.errors = error.response.data
                        console.log("Error: ->", this.errors);
                    });
            }
        },
        viewTestDetails(id) {
            $('#testCaseViewModal').modal('show');
            axios.get(`http://127.0.0.1:8000/api/unit_test_api/${id}/`)
                .then(response => {
                    this.formData = response.data;
                    console.log("Success Response:", this.flatFormData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        updateTestDetails(id) {
            $('#updateTestCase').modal('show');
            axios.get(`http://127.0.0.1:8000/api/unit_test_api/${id}/`)
                .then(response => {
                    this.formData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        sliceDescription(address) {
            const words = address.split(' ');
            if (words.length > 5) {
              return words.slice(0, 5).join(' ') + '...';
            } else {
              return address;
            }
        },
    },
    mounted() {
        // DATATABLE DATA
        axios.get('http://127.0.0.1:8000/api/unit_test_api/')
            .then(response => {
                this.testData = response.data;
                $(document).ready(function () {
                    $('#unitTestTable').DataTable();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // FETCHING THE BUG TYPE:
        axios.get('http://127.0.0.1:8000/api/get_bug_type/')
            .then(response => {
                this.bug_type = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // FETCH TEST STATUS
        axios.get('http://127.0.0.1:8000/api/bug_status/')
            .then(response => {
                this.bug_status = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // FETCH TEST REVIEW
        axios.get('http://127.0.0.1:8000/api/review/')
            .then(response => {
                this.review = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


        $('#addTestCase, #updateTestCase').on('hidden.bs.modal', () => {
            this.errors = {};
            this.formData = {};
        });
    },
})




//Sale Voucher
  new Vue({
    el: '#sales',
    data: {
      sales: [{
        amount: '',
      }] // Initial purchase div
    },
    methods: {
        addSale() {
        this.sales.push({}); // Add an empty object to the array
      },
      openModal(id) {
        // alert(id);
        // alert(typeof(id));

        // const result = this.purchases.find(item => item.id === index);

        // console.log(this.purchases);
        // console.log(result);
        // Open modal for the specific purchase item using the index
        $('#addSaleCostCenter').modal('show');
      }
    }
  });


  //Expense Voucher
  new Vue({
    el: '#expenses',
    data: {
      expenses: [{
        expense_amount: '',
      }] // Initial purchase div
    },
    methods: {
        addExpense() {
        this.expenses.push({}); // Add an empty object to the array
      },
      openModal(id) {
        // alert(id);
        // alert(typeof(id));

        // const result = this.purchases.find(item => item.id === index);

        // console.log(this.purchases);
        // console.log(result);
        // Open modal for the specific purchase item using the index
        $('#addExpenseCostCenter').modal('show');
      }
    }
  });


//Income Voucher
new Vue({
    el: '#incomes',
    data: {
        incomes: [{
        income_amount: '',
        }] // Initial purchase div
    },
    methods: {
        addIncome() {
        this.incomes.push({}); // Add an empty object to the array
        },
        openModal(id) {
        // alert(id);
        // alert(typeof(id));

        // const result = this.purchases.find(item => item.id === index);

        // console.log(this.purchases);
        // console.log(result);
        // Open modal for the specific purchase item using the index
        $('#addIncomeCostCenter').modal('show');
        }
    }
    });


