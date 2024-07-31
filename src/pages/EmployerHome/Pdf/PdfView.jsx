import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useLocation } from 'react-router-dom';
import { pdfData } from '../../../api';
import { pdfjs } from 'react-pdf';
import '../../../pdfjsWorker';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
function PDF() {
    const location = useLocation();
    const { pdf } = location.state || {};  // pdf should be the filename
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        if (pdf) {
            const fetchPdf = async () => {
                try {
                    // Fetch the PDF file as a blob
                    const response = await pdfData(pdf);
                    const url = URL.createObjectURL(response.data); // response.data is a Blob
                    setPdfUrl(url);
                } catch (error) {
                    console.error('Error fetching PDF:', error);
                }
            };

            fetchPdf();

            // Cleanup URL on component unmount
            return () => {
                if (pdfUrl) {
                    URL.revokeObjectURL(pdfUrl);
                }
            };
        }
    }, [pdf]);

    return (
        <div className='w-[100%] h-auto px-5 py-5 bg-[#f6f5fa]'>
            {pdfUrl ? (
                <Document
                    file={pdfUrl}
                    onLoadError={(error) => console.error('Error loading PDF:', error)}
                >
                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
}

export default PDF;
