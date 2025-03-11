import {useEffect, useRef, useState} from "react";
import JsBarcode from "jsbarcode";
import {Button} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent} from "@heroui/modal";
import {ThemeInput} from "@/app/components/Form/Input/ThemeInput";

const BarcodeGenerator = ({ stock, isPrintModalOpen, onPrintModalOpenChange }) => {
  const barcodeRef = useRef(null);
  const [barcodeWidth, setBarcodeWidth] = useState(288);
  const printableRef = useRef(null); // Ref for the printable area
  const [quantity, setQuantity] = useState(0); // State for quantity

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, stock.barcode, {
        format: "CODE128",
        displayValue: true,
        height: 50,
        width: 2, // Initial width for clarity
      });

      // Scale barcode to fit the full width
      // const containerWidth = barcodeRef.current.parentElement.offsetWidth;
      let getBarcodeWidth = barcodeRef.current.getBBox().width;
      setBarcodeWidth(getBarcodeWidth)
      //
      // if (barcodeWidth > 0) {
      //   barcodeRef.current.style.transform = `scaleX(${containerWidth / barcodeWidth})`;
      //   barcodeRef.current.style.transformOrigin = "left"; // Scale from left
      // }
    }
  }, [stock]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    let printableContent = "";

    for (let i = 0; i < quantity; i++) {
      printableContent += `
      <div class="printable-area">
        <div class="quantity">Barcode ${i + 1}</div>
        ${printableRef.current.innerHTML}
      </div>
    `;
    }

    printWindow.document.write(`
    <html>
      <head>
        <title>Print Barcode</title>
        <style>
          @media print {
            body { margin: 0; padding: 0; }
            .printable-container {
              display: flex;
              flex-wrap: wrap;
              gap: 10px; /* Space between barcodes */
              justify-content: center; /* Center barcodes horizontally */
            }
            .printable-area {
              flex: 1 1 200px; /* Flex-grow, flex-shrink, flex-basis */
              text-align: center;
              margin-bottom: 10px;
              border: 1px solid #ccc; /* Optional: Add border for clarity */
              padding: 10px; /* Optional: Add padding for spacing */
            }
            svg { width: 100%; height: auto; }
            .quantity { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="printable-container">
          ${printableContent}
        </div>
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  return (

    <Modal
      style={{width:barcodeWidth + 50}}
      backdrop="blur"
      placement="center"
      className="bg-background"
      isOpen={isPrintModalOpen}
      onOpenChange={onPrintModalOpenChange}
    >
      <ModalContent>
        <div className="ml-5 pt-5 text-white text-sm">Sell Item - {stock?.name}</div>
        <div className="border border-themeBorder mt-2"></div>
        <ModalBody>
          {/* Quantity Input */}
          <div className="mb-1">
            <ThemeInput
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
              max={20}
            />
          </div>
          {/* Printable area */}
          <div ref={printableRef}  style={{ width: "100%", margin: 'auto' }}>
            <svg className="rounded" ref={barcodeRef} style={{ margin: "auto" }}></svg>
          </div>
        </ModalBody>
        <div className="border border-themeBorder"></div>
        <div className="flex justify-end space-x-2 my-3 px-5">
          {/*<Button className="border-danger-900 text-danger" >Delete</Button>*/}
          <Button type="submit" className="bg-themeSecondary text-white" onPress={handlePrint}>Print</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default BarcodeGenerator;
