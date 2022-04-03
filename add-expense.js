$("#unggah-struk").on("change", function(e){
    let image = e.target.files;
    if (image.length < 1) return alert("Cancel picking image");
    const image_uri = URL.createObjectURL(image[0]);

    const loader =  `<div id="loader-screen" class="position-absolute top-0 start-0 end-0 bottom-0 bg-black opacity-50 d-flex">
                        <div class="spinner-border text-primary m-auto" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>`

    $("body").append(loader);

    Tesseract.recognize(
        image_uri,
        'eng',
        { logger: m => console.log(m) }
    )
        .then(function({ data: { text } }){
            // console.log(text);

            const array_text_per_row = text.split('\n');
            const index_target_text = array_text_per_row.findIndex(text => text.includes("Total:"));
            // console.log(array_text_per_row[index_target_text]);

            const total_line = array_text_per_row[index_target_text];
            const total_line_split = total_line.split(" ");
            // console.log(total_line_split);

            const total_index = total_line_split.length - 1;
            const total = total_line_split[total_index];
            $("#jumlah-pengeluaran").val(total.replace("Rp", "").replace("Rp.", ""). replace("Rp. ", ""));

            $("#loader-screen").remove();
        });
});