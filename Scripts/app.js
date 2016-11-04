var mainModule = (function () {

    var saleurl = "/api/sale";

    function onClickTable() {

        $('#tblEmployee').on('click', 'tr', function () {
            $('#modalChooser').val(1);
            var value = $(this).closest('tr').children('td:first').text();

            $.ajax({
                type: 'GET',
                url: saleurl + '/' + value,
            }).success(function (result) {
                $('#ProductID').val(result[0].ProductID);
                $('#Name').val(result[0].Name);
                $('#ProductNumber').val(result[0].ProductNumber);
                $('#Color').val(result[0].Color);
                $('#StandardCost').val(result[0].StandardCost);
                $('#SellStartDate').val(result[0].SellStartDate);
                $('#rowguid').val(result[0].rowguid);
            }).error(function () {
                $(".body-content").html("An error occurred")
            });
            initModalProduct();

        });
        
    }
    function getAllProducts() {
        $.ajax({
            type: 'GET',
            url: saleurl,
        }).success(function (result) {
            var items = '';
            var rows = " <tr>" +
                "<th>Product ID</th><th>Name</th><th>Product Number</th><th>Color</th><th>Standard Cost</th>" +
                "</tr>";
            $('#tblEmployee thead').append(rows);

            $.each(result, function (i, item) {
                var rows = "<tr data-toggle='modal' data-target='#myModal'>" +
                    "<td>" + item.ProductID + "</td>" +
                    "<td>" + item.Name + "</td>" +
                    "<td>" + item.ProductNumber + "</td>" +
                    "<td>" + item.Color + "</td>" +
                    "<td>" + item.StandardCost + "</td>" +
                    "</tr>";
                $('#tblEmployee tbody').append(rows);
            });
        }).error(function () {
            $(".body-content").html("An error occurred")
        });
    }
    function submitProduct() {
        
        $("#productForm").submit(function (e) {
            var formProduct = $("#productForm");

            $.ajax({
                type: 'POST',
                url: saleurl ,
                data: formProduct ? formProduct.serialize() : null, 
            }).success(function (result) {
                
            }).error(function () {
                $(".body-content").html("An error occurred")
            });

        });
    }

    function updateProduct() {

        $("#productForm").submit(function (e) {
            var formProduct = $("#productForm");
            var id = $('#ProductID').val();

            $.ajax({
                type: 'PUT',
                url: saleurl + '/' + id,
                data: formProduct ? formProduct.serialize() : null, 
            }).success(function (result) {

            }).error(function () {
                $(".body-content").html("An error occurred")
            });
        });
        
    }

    function ajaxHelper(uri, method, data) {

    }
    function selectedAction() {
        $('#modalChooser').val('');
        initModalProduct();
    }
    function initModalProduct() {
        if ($('#modalChooser').val() == '1') {
            $(".update-option").removeClass("noshow-update");
            $(".create-option").addClass("noshow-create");
           
        } else if ($('#modalChooser').val() == '') {
            $(".create-option").removeClass("noshow-create");
            $(".update-option").addClass("noshow-update");
            $(':input').not(':button,:submit').val('');
        }
    }
    function init() {

        getAllProducts();
        onClickTable();
    }

    init(); 

    return {
        submitProduct: submitProduct,
        updateProduct: updateProduct,
        selectedAction: selectedAction
    };   

})();