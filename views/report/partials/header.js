const text = `
<div class="page-header pb-3">
    <div class="container-fluid">
        <p class="text-grey-medium small">
            <span class="page-number text-black"></span> 
            <strong>Cloud Adoption</strong> A Change Readiness Self-Assessment
        </p>
    </div>
</div>
`

const template = Handlebars.compile(text);

export default template;