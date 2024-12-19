import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Upload, File, X, Plus } from 'lucide-react';
import { PDFUploadAPI, PDFAnalytics } from '../apis/pdf_uploadAPI';

const PdfAnalyzer = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedLot, setSelectedLot] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('pdfs', file);
      });

      const processResponse = await PDFUploadAPI(formData);
      const { job_id } = processResponse.data;
      
      const pollResults = async () => {
        const resultResponse = await PDFAnalytics(job_id);
        const result = resultResponse.data;
        
        if (result.status === 'pending') {
          setTimeout(pollResults, 5000);
        } else if (result.status === 'failed') {
          setError('Analisi fallita');
          setUploading(false);
        } else {
          setAnalysisData(result);
          setUploading(false);
        }
      };

      pollResults();

    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  const renderUploadSection = () => (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">
            Carica i file PDF per l'analisi
          </h1>
          <p className="text-center text-gray-600">
            Carica l'avviso d'asta e la perizia in formato PDF
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-12 h-12 text-gray-400" />
                <span className="text-gray-600">Clicca qui per caricare i file PDF</span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <File className="w-5 h-5 text-gray-500" />
                      <span>{file.name}</span>
                      <span className="text-sm text-gray-500">
                        ({Math.round(file.size / 1024)} KB)
                      </span>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <div className="flex justify-between mt-4">
                  <label 
                    htmlFor="file-upload" 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Aggiungi altro
                  </label>
                  
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {uploading ? 'Analisi in corso...' : 'Analizza'}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalysisResults = () => {
    const lots = Object.entries(analysisData).filter(([key]) => 
      !['completion_tokens', 'prompt_tokens', 'total_cost', 'total_tokens'].includes(key)
    );

    if (selectedLot) {
      return (
        <div className="max-w-6xl mx-auto p-4">
          <button 
            onClick={() => setSelectedLot(null)}
            className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
          >
            ← Torna alla lista dei lotti
          </button>
          
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {selectedLot.id.replace(/_/g, ' ')}
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(selectedLot.data).map(([fieldName, fieldData]) => {
              if (typeof fieldData === 'object' && fieldData !== null) {
                return (
                  <Card key={fieldName} className="mb-4">
                    <CardHeader>
                      <h3 className="text-lg font-semibold capitalize">
                        {fieldName.replace(/_/g, ' ')}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        {fieldData.value}
                      </p>
                      {fieldData.sources && (
                        <div className="mt-2 text-sm text-gray-500">
                          <p className="font-medium">Fonte:</p>
                          {fieldData.sources.map((source, index) => (
                            <div key={index}>
                              <p>Documento: {source.source}</p>
                              <p>Pagina: {source.page_num}</p>
                              {fieldData.source_text && (
                                <p className="mt-1 p-2 bg-gray-50 rounded text-sm">
                                  "{fieldData.source_text}"
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Seleziona un Lotto
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lots.map(([lotId, lotData]) => (
            <Card 
              key={lotId}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedLot({ id: lotId, data: lotData })}
            >
              <CardHeader>
                <h2 className="text-xl font-semibold capitalize">
                  {lotId.replace(/_/g, ' ')}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {lotData.tipologia_immobile?.value || 'Dettagli non disponibili'}
                </p>
                {lotData.valore_immobiliare?.value && (
                  <p className="mt-2 font-medium">
                    Valore: €{parseFloat(lotData.valore_immobiliare.value).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {!analysisData ? renderUploadSection() : renderAnalysisResults()}
    </div>
  );
};

export default PdfAnalyzer;
