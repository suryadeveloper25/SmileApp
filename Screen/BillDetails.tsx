

// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   StyleSheet,
// //   ScrollView,
// //   Dimensions,
// //   Platform,
// //   StatusBar,
// //   Alert,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialIcons';
// // import MaterialIcons from '@react-native-vector-icons/material-icons';
// // import axios from 'axios';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { fonts } from '../root/config';
// // import { generatePDF } from 'react-native-html-to-pdf';
// // import Share from 'react-native-share';
// // import RNFS from 'react-native-fs';

// // // ─── Responsive helpers ──────────────────────────────────────────────────────
// // const { width, height } = Dimensions.get('window');

// // const BASE_WIDTH = 360;
// // const scale = width / BASE_WIDTH;
// // const normalize = (size: number) => Math.round(size * scale);

// // const wp = (pct: number) => (width * pct) / 100;
// // const hp = (pct: number) => (height * pct) / 100;

// // const clamp = (val: number, min: number, max: number) =>
// //   Math.min(Math.max(val, min), max);

// // // ─── Design tokens ────────────────────────────────────────────────────────────
// // const COLORS = {
// //   primary: '#6A1B9A',
// //   primaryDark: '#6A1B9A',
// //   primaryLight: '#ffffff',
// //   textPrimary: '#1E1B4B',
// //   textSecondary: '#6B7280',
// //   divider: '#E5E7EB',
// //   success: '#10B981',
// //   error: '#EF4444',
// //   shadow: 'rgba(124, 58, 237, 0.18)',
// // };

// // // ─── Interfaces ───────────────────────────────────────────────────────────────
// // interface BillData {
// //   billNo: string;
// //   billDate: string;
// //   amount: string;
// //   orgId: string;
// // }

// // interface BillDetailData {
// //   stud_profile_Id: string;
// //   student_name: string;
// //   roll_no: string;
// //   std_name: string;
// //   section: string;
// //   bill_no: string;
// //   bill_date: string;
// //   fee_amount: string;
// //   paid_amount: string;
// //   pending_amt: string;
// // }

// // interface BillDetailsScreenProps {
// //   route: any;
// //   navigation: any;
// // }

// // interface StudentData {
// //   id: string;
// //   name: string;
// //   std: string;
// //   section: string;
// //   roll: string;
// // }

// // // ─── Number to Words Utility ──────────────────────────────────────────────────
// // const convertNumberToWords = (num: number): string => {
// //   try {
// //     if (num === 0) return 'Zero Only';
// //     if (num < 0) return 'Invalid Amount';

// //     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
// //     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
// //     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
// //     const scales = ['', 'Thousand', 'Million', 'Billion'];

// //     const convertHundred = (n: number): string => {
// //       let result = '';
// //       if (n >= 100) {
// //         result += ones[Math.floor(n / 100)] + ' Hundred ';
// //         n %= 100;
// //       }
// //       if (n >= 20) {
// //         result += tens[Math.floor(n / 10)] + ' ';
// //         n %= 10;
// //       } else if (n >= 10) {
// //         result += teens[n - 10] + ' ';
// //         return result.trim();
// //       }
// //       result += ones[n];
// //       return result.trim();
// //     };

// //     const parts: string[] = [];
// //     let scaleIndex = 0;

// //     while (num > 0 && scaleIndex < scales.length) {
// //       const part = num % 1000;
// //       if (part !== 0) {
// //         const partWords = convertHundred(part);
// //         parts.unshift(
// //           partWords + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '')
// //         );
// //       }
// //       num = Math.floor(num / 1000);
// //       scaleIndex++;
// //     }

// //     return parts.join(' ').trim() + ' Only';
// //   } catch (error) {
// //     console.log('Error converting number to words:', error);
// //     return 'Unable to Convert';
// //   }
// // };

// // // ─── Component ────────────────────────────────────────────────────────────────
// // const BillDetailsScreen: React.FC<BillDetailsScreenProps> = ({ route, navigation }) => {
// //   const { bill, orgid, studentId, studentData } = route?.params || {};

// //   const [billDetails, setBillDetails] = useState<BillDetailData[]>([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isDownloading, setIsDownloading] = useState(false);

// //   /**
// //    * Fetch detailed bill information
// //    */
// //   React.useEffect(() => {
// //     const getBillDetail = async () => {
// //       if (!bill) {
// //         Alert.alert('Error', 'Invalid bill selected');
// //         navigation.goBack();
// //         return;
// //       }

// //       setIsLoading(true);
// //       try {
// //         // Convert date format DD-MM-YYYY to YYYY-MM-DD
// //         const [day, month, year] = bill.billDate.split('-');
// //         const formattedDate = `${year}-${month}-${day}`;

// //         const response = await axios.post(
// //           `https://www.vtsmile.in/app/api/students/fee_bill_print_api`,
// //           null,
// //           {
// //             params: {
// //               orgId: bill.orgId,
// //               billNo: bill.billNo,
// //               billDate: formattedDate,
// //             },
// //             timeout: 10000,
// //           }
// //         );

// //         if (response?.data?.isSuccess && response?.data?.data) {
// //           setBillDetails(Array.isArray(response.data.data) ? response.data.data : []);
// //         } else {
// //           Alert.alert('Error', 'No data found for this bill');
// //         }
// //       } catch (error) {
// //         console.log('Error fetching bill detail:', error);
// //         Alert.alert('Error', 'Failed to load bill details. Please try again.');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     getBillDetail();
// //   }, [bill, navigation]);

// //   /**
// //    * Generate professional PDF HTML content
// //    */
// //   const generateBillHTML = (billData: BillDetailData[]): string => {
// //     if (!billData || billData.length === 0) {
// //       return '<html><body><p>No data available</p></body></html>';
// //     }

// //     try {
// //       const firstRecord = billData[0];
// //       const totalFeeAmount = billData.reduce(
// //         (sum, item) => sum + (parseFloat(item.fee_amount) || 0),
// //         0
// //       );
// //       const totalPaidAmount = billData.reduce(
// //         (sum, item) => sum + (parseFloat(item.paid_amount) || 0),
// //         0
// //       );
// //       const totalPending = billData.reduce(
// //         (sum, item) => sum + (parseFloat(item.pending_amt) || 0),
// //         0
// //       );

// //       const tableRows = billData
// //         .map((item, index) => `
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px;">${index + 1}</td>
// //             <td style="border: 1px solid #000; padding: 8px; font-size: 14px;">Fee Item ${index + 1}</td>
// //             <td style="border: 1px solid #000; padding: 8px; text-align: right; font-size: 14px;">₹${parseFloat(item.fee_amount || '0').toFixed(2)}</td>
// //           </tr>
// //         `)
// //         .join('');

// //       const amountInWords = convertNumberToWords(Math.round(totalPaidAmount));
// //       const currentDate = new Date().toLocaleDateString('en-IN', {
// //         year: 'numeric',
// //         month: 'long',
// //         day: 'numeric',
// //       });

// //       return `
// //         <!DOCTYPE html>
// //         <html>
// //         <head>
// //           <meta charset="UTF-8">
// //           <style>
// //             * {
// //               margin: 0;
// //               padding: 0;
// //               box-sizing: border-box;
// //             }
// //             body {
// //               font-family: Arial, sans-serif;
// //               background: white;
// //               padding: 20px;
// //             }
// //             .container {
// //               max-width: 900px;
// //               margin: 0 auto;
// //               background: white;
// //               padding: 20px;
// //             }
// //             .header {
// //               text-align: center;
// //               border-bottom: 3px solid #333;
// //               padding-bottom: 15px;
// //               margin-bottom: 20px;
// //             }
// //             .school-name {
// //               font-size: 24px;
// //               font-weight: bold;
// //               color: #333;
// //               margin-bottom: 5px;
// //             }
// //             .school-address {
// //               font-size: 12px;
// //               color: #666;
// //               margin-bottom: 3px;
// //             }
// //             .receipt-title {
// //               background: #cccccc;
// //               padding: 10px;
// //               font-size: 18px;
// //               font-weight: bold;
// //               text-align: center;
// //               margin: 15px 0;
// //               border: 2px solid #333;
// //             }
// //             .info-section {
// //               display: flex;
// //               justify-content: space-between;
// //               margin-bottom: 15px;
// //               padding: 0 10px;
// //             }
// //             .info-column {
// //               flex: 1;
// //             }
// //             .info-row {
// //               display: flex;
// //               margin-bottom: 8px;
// //               font-size: 13px;
// //             }
// //             .info-label {
// //               font-weight: bold;
// //               width: 120px;
// //               color: #333;
// //             }
// //             .info-value {
// //               flex: 1;
// //               color: #333;
// //             }
// //             .info-divider {
// //               color: #333;
// //               margin: 0 5px;
// //             }
// //             .table-container {
// //               margin: 20px 0;
// //               border: 2px solid #000;
// //             }
// //             table {
// //               width: 100%;
// //               border-collapse: collapse;
// //             }
// //             th {
// //               background: #f5f5f5;
// //               border: 1px solid #000;
// //               padding: 10px;
// //               text-align: left;
// //               font-weight: bold;
// //               font-size: 14px;
// //               color: #333;
// //             }
// //             td {
// //               border: 1px solid #000;
// //               padding: 8px;
// //               font-size: 13px;
// //               color: #333;
// //             }
// //             .total-row {
// //               background: #cccccc;
// //               font-weight: bold;
// //               font-size: 14px;
// //             }
// //             .total-row td {
// //               padding: 12px;
// //             }
// //             .amount-in-words {
// //               border: 2px solid #000;
// //               padding: 15px;
// //               margin: 15px 0;
// //               font-size: 14px;
// //               font-weight: bold;
// //               color: #333;
// //             }
// //             .summary-section {
// //               margin: 15px 0;
// //               padding: 15px;
// //               border: 1px solid #ddd;
// //             }
// //             .summary-row {
// //               display: flex;
// //               justify-content: space-between;
// //               margin-bottom: 8px;
// //               font-size: 13px;
// //             }
// //             .summary-label {
// //               font-weight: bold;
// //               color: #333;
// //             }
// //             .summary-value {
// //               color: #333;
// //             }
// //             .footer {
// //               margin-top: 30px;
// //               text-align: center;
// //               font-size: 11px;
// //               color: #666;
// //               border-top: 1px solid #ccc;
// //               padding-top: 10px;
// //             }
// //           </style>
// //         </head>
// //         <body>
// //           <div class="container">
// //             <!-- Header -->
// //             <div class="header">
// //               <div class="school-name">Vijayanta Matriculation School</div>
// //               <div class="school-address">Street, Chennai</div>
// //               <div class="school-address">T.Nager, Chennai, 600063</div>
// //             </div>

// //             <!-- Receipt Title -->
// //             <div class="receipt-title">FEE RECEIPT</div>

// //             <!-- Info Section -->
// //             <div class="info-section">
// //               <div class="info-column">
// //                 <div class="info-row">
// //                   <span class="info-label">Bill No</span>
// //                   <span class="info-divider">:</span>
// //                   <span class="info-value">${firstRecord.bill_no || 'N/A'}</span>
// //                 </div>
// //                 <div class="info-row">
// //                   <span class="info-label">Name</span>
// //                   <span class="info-divider">:</span>
// //                   <span class="info-value">${firstRecord.student_name || 'N/A'}</span>
// //                 </div>
// //                 <div class="info-row">
// //                   <span class="info-label">Roll No</span>
// //                   <span class="info-divider">:</span>
// //                   <span class="info-value">${firstRecord.roll_no || 'N/A'}</span>
// //                 </div>
// //               </div>
// //               <div class="info-column">
// //                 <div class="info-row">
// //                   <span class="info-label">Bill Date</span>
// //                   <span class="info-divider">:</span>
// //                   <span class="info-value">${firstRecord.bill_date || 'N/A'}</span>
// //                 </div>
// //                 <div class="info-row">
// //                   <span class="info-label">Class</span>
// //                   <span class="info-divider">:</span>
// //                   <span class="info-value">${firstRecord.std_name || ''} ${firstRecord.section || ''}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <!-- Fee Table -->
// //             <div class="table-container">
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th style="width: 80px; text-align: center;">Sl.No</th>
// //                     <th style="flex: 1;">Fee Particulars</th>
// //                     <th style="width: 150px; text-align: right;">Amount</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   ${tableRows}
// //                   <tr class="total-row">
// //                     <td colspan="2" style="text-align: left;">Total Amount</td>
// //                     <td style="text-align: right;">₹${totalFeeAmount.toFixed(2)}</td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>

// //             <!-- Amount in Words -->
// //             <div class="amount-in-words">
// //               Amount (In Words) : ${amountInWords}
// //             </div>

// //             <!-- Summary -->
// //             <div class="summary-section">
// //               <div class="summary-row">
// //                 <span class="summary-label">Total Fee Amount:</span>
// //                 <span class="summary-value">₹${totalFeeAmount.toFixed(2)}</span>
// //               </div>
// //               <div class="summary-row">
// //                 <span class="summary-label">Total Paid Amount:</span>
// //                 <span class="summary-value">₹${totalPaidAmount.toFixed(2)}</span>
// //               </div>
// //               <div class="summary-row">
// //                 <span class="summary-label">Total Pending:</span>
// //                 <span class="summary-value">₹${totalPending.toFixed(2)}</span>
// //               </div>
// //             </div>

// //             <!-- Footer -->
// //             <div class="footer">
// //               <p>Generated on ${currentDate}</p>
// //               <p>This is a computer-generated receipt. No signature required.</p>
// //             </div>
// //           </div>
// //         </body>
// //         </html>
// //       `;
// //     } catch (error) {
// //       console.log('Error generating HTML:', error);
// //       return '<html><body><p>Error generating receipt</p></body></html>';
// //     }
// //   };

// //   /**
// //    * Download bill receipt as PDF
// //    */
// //   const downloadBillReceipt = async (): Promise<void> => {
// //     if (!bill || !billDetails || billDetails.length === 0) {
// //       Alert.alert('Error', 'No bill data available to download.');
// //       return;
// //     }

// //     setIsDownloading(true);
// //     try {
// //       const htmlContent = generateBillHTML(billDetails);
      
// //       // Validate HTML content
// //       if (!htmlContent || htmlContent.trim().length === 0) {
// //         throw new Error('HTML content is empty');
// //       }

// //       const fileName = `Bill_${bill.billNo}_${bill.billDate.replace(/\//g, '-')}`;

// //       // Configure PDF options
// //     //   const options = {
// //     //     html: htmlContent,
// //     //     fileName: fileName,
// //     //     directory: Platform.OS === 'android' ? 'Documents' : 'Documents',
// //     //     base64: false,
// //     //     width: 595,
// //     //     height: 842,
// //     //   };

// //       // Generate PDF
// //       const pdf = await generatePDF({
// //          html: htmlContent,
// //         fileName: fileName,
// //         base64: false,
// //       });

// //       if (pdf && pdf.filePath) {
// //         // Determine the save location based on platform
// //         const destinationPath = Platform.OS === 'android'
// //           ? `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`
// //           : `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;

// //         // Copy the file to the destination
// //         await RNFS.copyFile(pdf.filePath, destinationPath);

// //         // Attempt to share the file
// //         try {
// //           await Share.open({
// //             url: Platform.OS === 'android' 
// //               ? `file://${destinationPath}` 
// //               : destinationPath,
// //             type: 'application/pdf',
// //             title: 'Share Bill Receipt',
// //             message: 'Here is your bill receipt',
// //             failOnCancel: false,
// //           });
// //         } catch (shareError) {
// //           console.log('Share cancelled or error:', shareError);
// //         }

// //         // Show success message
// //         Alert.alert(
// //           'Success',
// //           Platform.OS === 'android'
// //             ? `Bill receipt downloaded!\n\nFile: ${fileName}.pdf\n\nLocation: Downloads folder`
// //             : `Bill receipt generated!\n\nFile: ${fileName}.pdf`,
// //           [{ text: 'OK', onPress: () => {} }]
// //         );
// //       } else {
// //         Alert.alert('Error', 'Failed to generate PDF file. Please try again.');
// //       }
// //     } catch (error) {
// //       console.log('Error generating PDF:', error);
// //       Alert.alert(
// //         'Error',
// //         `Failed to generate bill receipt.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
// //       );
// //     } finally {
// //       setIsDownloading(false);
// //     }
// //   };

// //   const BillInfoRow = ({
// //     label,
// //     value,
// //     highlight,
// //     error,
// //   }: {
// //     label: string;
// //     value: string;
// //     highlight?: boolean;
// //     error?: boolean;
// //   }) => (
// //     <View style={styles.billInfoRow}>
// //       <Text style={styles.billInfoLabel}>{label}</Text>
// //       <Text
// //         style={[
// //           styles.billInfoValue,
// //           highlight && styles.billInfoValueHighlight,
// //           error && styles.billInfoValueError,
// //         ]}
// //       >
// //         {value}
// //       </Text>
// //     </View>
// //   );

// //   if (isLoading) {
// //     return (
// //       <View style={styles.loaderContainer}>
// //         <ActivityIndicator size="large" color={COLORS.primary} />
// //         <Text style={styles.loaderText}>Loading bill details…</Text>
// //       </View>
// //     );
// //   }

// //   if (!billDetails || billDetails.length === 0) {
// //     return (
// //       <SafeAreaView style={styles.safeArea} edges={['top']}>
// //         <View style={styles.header}>
// //           <TouchableOpacity
// //             onPress={() => navigation.goBack()}
// //             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// //           >
// //             <Icon
// //               name="arrow-back"
// //               size={normalize(24)}
// //               color="#fff"
// //             />
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>Bill Details</Text>
// //           <View style={{ width: normalize(40) }} />
// //         </View>
// //         <View style={styles.emptyContainer}>
// //           <Text style={styles.emptyTitle}>No Data</Text>
// //           <Text style={styles.emptySubtitle}>
// //             Bill details not available
// //           </Text>
// //         </View>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <>
// //       <SafeAreaView style={styles.safeArea} edges={['top']}>
// //         <View style={styles.header}>
// //           <TouchableOpacity
// //             onPress={() =>
// //                     navigation.navigate('BillsList', {
// //                       bill,
// //                       orgid,
// //                       studentId,
// //                       studentData,
// //                     })
// //                   }
// //             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
// //           >
// //             <Icon
// //               name="arrow-back"
// //               size={normalize(24)}
// //               color="#fff"
// //             />
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>Bill Details</Text>
// //           <View style={{ width: normalize(40) }} />
// //         </View>

// //         <ScrollView
// //           contentContainerStyle={styles.scrollContent}
// //           showsVerticalScrollIndicator={false}
// //         >
// //           <View style={styles.contentCard}>
// //             {/* Bill Header */}
// //             <View style={styles.billDetailHeader}>
// //               <Text style={styles.billDetailTitle}>
// //                 Bill Receipt #{billDetails[0]?.bill_no}
// //               </Text>
// //               <Text style={styles.billDetailDate}>
// //                 {billDetails[0]?.bill_date}
// //               </Text>
// //             </View>

// //             {/* Student Info */}
// //             <View style={styles.billSection}>
// //               <Text style={styles.sectionTitle}>
// //                 Student Information
// //               </Text>
// //               <BillInfoRow
// //                 label="Name"
// //                 value={
// //                   billDetails[0]?.student_name ||
// //                   'N/A'
// //                 }
// //               />
// //               <BillInfoRow
// //                 label="Roll No"
// //                 value={billDetails[0]?.roll_no || 'N/A'}
// //               />
// //               <BillInfoRow
// //                 label="Class"
// //                 value={`${billDetails[0]?.std_name || ''} - ${billDetails[0]?.section || ''}`}
// //               />
// //             </View>

// //             {/* Fee Details */}
// //             <View style={styles.billSection}>
// //               <Text style={styles.sectionTitle}>
// //                 Fee Details
// //               </Text>
// //               {billDetails.map((item, index) => (
// //                 <View
// //                   key={`fee-detail-${index}`}
// //                   style={styles.feeDetailCard}
// //                 >
// //                   <View style={styles.feeDetailRow}>
// //                     <Text style={styles.feeDetailLabel}>
// //                       Fee Item {index + 1}
// //                     </Text>
// //                   </View>
// //                   <BillInfoRow
// //                     label="Fee Amount"
// //                     value={`₹ ${parseFloat(item.fee_amount || '0').toFixed(2)}`}
// //                   />
// //                   <BillInfoRow
// //                     label="Paid Amount"
// //                     value={`₹ ${parseFloat(item.paid_amount || '0').toFixed(2)}`}
// //                     highlight={
// //                       parseFloat(item.paid_amount || '0') > 0
// //                     }
// //                   />
// //                   <BillInfoRow
// //                     label="Pending"
// //                     value={`₹ ${parseFloat(item.pending_amt || '0').toFixed(2)}`}
// //                     error={
// //                       parseFloat(item.pending_amt || '0') > 0
// //                     }
// //                   />
// //                 </View>
// //               ))}
// //             </View>

// //             {/* Summary */}
// //             <View style={styles.billSection}>
// //               <Text style={styles.sectionTitle}>
// //                 Summary
// //               </Text>
// //               <View style={styles.summaryCard}>
// //                 <View style={styles.summaryRow}>
// //                   <Text style={styles.summaryLabel}>
// //                     Total Fee Amount:
// //                   </Text>
// //                   <Text style={styles.summaryValue}>
// //                     ₹
// //                     {billDetails
// //                       .reduce(
// //                         (sum, item) =>
// //                           sum +
// //                           parseFloat(
// //                             item.fee_amount || '0'
// //                           ),
// //                         0
// //                       )
// //                       .toFixed(2)}
// //                   </Text>
// //                 </View>
// //                 <View style={styles.summaryRow}>
// //                   <Text style={styles.summaryLabel}>
// //                     Total Paid Amount:
// //                   </Text>
// //                   <Text
// //                     style={[
// //                       styles.summaryValue,
// //                       {
// //                         color: COLORS.success,
// //                       },
// //                     ]}
// //                   >
// //                     ₹
// //                     {billDetails
// //                       .reduce(
// //                         (sum, item) =>
// //                           sum +
// //                           parseFloat(
// //                             item.paid_amount || '0'
// //                           ),
// //                         0
// //                       )
// //                       .toFixed(2)}
// //                   </Text>
// //                 </View>
// //                 <View
// //                   style={[
// //                     styles.summaryRow,
// //                     styles.summaryRowBorder,
// //                   ]}
// //                 >
// //                   <Text style={styles.summaryLabel}>
// //                     Total Pending:
// //                   </Text>
// //                   <Text
// //                     style={[
// //                       styles.summaryValue,
// //                       {
// //                         color:
// //                           billDetails.reduce(
// //                             (sum, item) =>
// //                               sum +
// //                               parseFloat(
// //                                 item.pending_amt || '0'
// //                               ),
// //                             0
// //                           ) > 0
// //                             ? COLORS.error
// //                             : COLORS.success,
// //                       },
// //                     ]}
// //                   >
// //                     ₹
// //                     {billDetails
// //                       .reduce(
// //                         (sum, item) =>
// //                           sum +
// //                           parseFloat(
// //                             item.pending_amt || '0'
// //                           ),
// //                         0
// //                       )
// //                       .toFixed(2)}
// //                   </Text>
// //                 </View>
// //               </View>
// //             </View>

// //             {/* Download Button */}
// //             <TouchableOpacity
// //               style={styles.downloadBtn}
// //               activeOpacity={0.85}
// //               onPress={downloadBillReceipt}
// //               disabled={isDownloading}
// //             >
// //               {isDownloading ? (
// //                 <ActivityIndicator
// //                   size="small"
// //                   color="#fff"
// //                 />
// //               ) : (
// //                 <>
// //                   <MaterialIcons
// //                     name="download"
// //                     size={normalize(16)}
// //                     color="#fff"
// //                   />
// //                   <Text style={styles.payBtnText}>
// //                     Download PDF Receipt
// //                   </Text>
// //                 </>
// //               )}
// //             </TouchableOpacity>

// //             <View style={{ height: hp(4) }} />
// //           </View>
// //         </ScrollView>
// //       </SafeAreaView>
// //     </>
// //   );
// // };

// // // ─── Styles ───────────────────────────────────────────────────────────────────

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: COLORS.primaryDark,
// //   },
// //   scrollContent: {
// //     flexGrow: 1,
// //     backgroundColor: '#e5e4e9',
// //     paddingBottom: hp(2),
// //   },
// //   loaderContainer: {
// //     flex: 1,
// //     backgroundColor: '#F8F7FF',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   loaderText: {
// //     fontSize: clamp(normalize(14), 12, 16),
// //     color: COLORS.textSecondary,
// //     letterSpacing: 0.3,
// //     marginTop: hp(2),
// //   },
// //   header: {
// //     backgroundColor: COLORS.primaryDark,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: wp(4),
// //     paddingVertical: hp(1.6),
// //   },
// //   headerTitle: {
// //     flex: 1,
// //     textAlign: 'center',
// //     color: '#fff',
// //     fontSize: clamp(normalize(18), 15, 20),
// //     fontFamily: fonts.FONT_BOLD,
// //     letterSpacing: 0.5,
// //   },
// //   contentCard: {
// //     marginHorizontal: wp(4),
// //     marginTop: hp(2),
// //     borderRadius: normalize(20),
// //     backgroundColor: '#fff',
// //     overflow: 'hidden',
// //     shadowColor: 'rgba(0,0,0,0.10)',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 1,
// //     shadowRadius: 10,
// //     elevation: 5,
// //     padding: wp(4),
// //   },
// //   billDetailHeader: {
// //     borderBottomWidth: 1.5,
// //     borderBottomColor: COLORS.divider,
// //     paddingBottom: hp(1.5),
// //     marginBottom: hp(1.5),
// //   },
// //   billDetailTitle: {
// //     fontSize: clamp(normalize(18), 16, 22),
// //     fontFamily: fonts.ROBOTO_BOLD,
// //     color: COLORS.primary,
// //     marginBottom: hp(0.5),
// //   },
// //   billDetailDate: {
// //     fontSize: clamp(normalize(12), 11, 14),
// //     color: COLORS.textSecondary,
// //     fontFamily: fonts.ROBOTO_BOLD,
// //   },
// //   billSection: {
// //     marginBottom: hp(2),
// //   },
// //   sectionTitle: {
// //     fontSize: clamp(normalize(14), 13, 16),
// //     fontFamily: fonts.ROBOTO_BOLD,
// //     color: COLORS.primary,
// //     marginBottom: hp(1),
// //     paddingHorizontal: wp(3),
// //   },
// //   billInfoRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingVertical: hp(0.8),
// //     paddingHorizontal: wp(3),
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: COLORS.divider,
// //   },
// //   billInfoLabel: {
// //     fontSize: clamp(normalize(12), 11, 14),
// //     color: COLORS.textSecondary,
// //     fontFamily: fonts.ROBOTO_BOLD,
// //   },
// //   billInfoValue: {
// //     fontSize: clamp(normalize(12), 11, 14),
// //     color: COLORS.textPrimary,
// //     fontFamily: fonts.ROBOTO_BOLD,
// //   },
// //   billInfoValueHighlight: {
// //     color: COLORS.success,
// //   },
// //   billInfoValueError: {
// //     color: COLORS.error,
// //   },
// //   feeDetailCard: {
// //     backgroundColor: 'rgba(255,255,255,0.6)',
// //     borderRadius: normalize(10),
// //     padding: wp(3),
// //     marginBottom: hp(1),
// //     borderLeftWidth: 4,
// //     borderLeftColor: COLORS.primary,
// //   },
// //   feeDetailRow: {
// //     marginBottom: hp(0.8),
// //   },
// //   feeDetailLabel: {
// //     fontSize: clamp(normalize(13), 12, 15),
// //     fontFamily: fonts.ROBOTO_BOLD,
// //     color: COLORS.primary,
// //   },
// //   summaryCard: {
// //     backgroundColor: COLORS.primaryLight,
// //     borderRadius: normalize(12),
// //     borderWidth: 1.5,
// //     borderColor: COLORS.primary,
// //     padding: wp(4),
// //     overflow: 'hidden',
// //   },
// //   summaryRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingVertical: hp(1),
// //   },
// //   summaryRowBorder: {
// //     borderTopWidth: 1.5,
// //     borderTopColor: COLORS.divider,
// //     paddingTop: hp(1.5),
// //     marginTop: hp(0.5),
// //   },
// //   summaryLabel: {
// //     fontSize: clamp(normalize(12), 11, 14),
// //     color: COLORS.textSecondary,
// //     fontFamily: fonts.ROBOTO_BOLD,
// //   },
// //   summaryValue: {
// //     fontSize: clamp(normalize(13), 12, 15),
// //     color: COLORS.textPrimary,
// //     fontFamily: fonts.ROBOTO_BOLD,
// //   },
// //   downloadBtn: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: COLORS.primary,
// //     marginTop: hp(2),
// //     borderRadius: normalize(16),
// //     paddingVertical: hp(1.8),
// //     gap: wp(2),
// //     shadowColor: 'rgba(0,0,0,0.2)',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 1,
// //     shadowRadius: 8,
// //     elevation: 6,
// //   },
// //   payBtnText: {
// //     color: '#fff',
// //     fontSize: clamp(normalize(15), 13, 17),
// //     fontFamily: fonts.ROBOTO_BOLD,
// //     letterSpacing: 0.4,
// //   },
// //   emptyContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   emptyTitle: {
// //     fontSize: clamp(normalize(20), 18, 24),
// //     fontFamily: fonts.ROBOTO_BOLD,
// //     color: COLORS.textPrimary,
// //     marginBottom: hp(0.8),
// //   },
// //   emptySubtitle: {
// //     fontSize: clamp(normalize(13), 12, 15),
// //     color: COLORS.textSecondary,
// //     textAlign: 'center',
// //   },
// // });

// // export default BillDetailsScreen;

// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Platform,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { fonts } from '../root/config';
// import { generatePDF } from 'react-native-html-to-pdf';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';

// // ─── Responsive helpers ──────────────────────────────────────────────────────
// const { width, height } = Dimensions.get('window');

// const BASE_WIDTH = 360;
// const scale = width / BASE_WIDTH;
// const normalize = (size: number) => Math.round(size * scale);

// const wp = (pct: number) => (width * pct) / 100;
// const hp = (pct: number) => (height * pct) / 100;

// const clamp = (val: number, min: number, max: number) =>
//   Math.min(Math.max(val, min), max);

// // ─── Design tokens ────────────────────────────────────────────────────────────
// const COLORS = {
//   primary: '#6A1B9A',
//   primaryDark: '#6A1B9A',
//   primaryLight: '#ffffff',
//   textPrimary: '#1E1B4B',
//   textSecondary: '#6B7280',
//   divider: '#E5E7EB',
//   success: '#10B981',
//   error: '#EF4444',
//   shadow: 'rgba(124, 58, 237, 0.18)',
// };

// // ─── Interfaces ───────────────────────────────────────────────────────────────
// interface BillData {
//   billNo: string;
//   billDate: string;
//   amount: string;
//   orgId: string;
// }

// interface BillDetailData {
//   stud_profile_Id: string;
//   student_name: string;
//   roll_no: string;
//   std_name: string;
//   section: string;
//   bill_no: string;
//   bill_date: string;
//   fee_name: string;
//   fee_amount: string;
//   paid_amount: string;
//   pending_amt: string;
// }

// interface BillDetailsScreenProps {
//   route: any;
//   navigation: any;
// }

// interface StudentData {
//   id: string;
//   name: string;
//   std: string;
//   section: string;
//   roll: string;
// }

// // ─── Number to Words Utility ──────────────────────────────────────────────────
// const convertNumberToWords = (num: number): string => {
//   try {
//     if (num === 0) return 'Zero Only';
//     if (num < 0) return 'Invalid Amount';

//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const scales = ['', 'Thousand', 'Million', 'Billion'];

//     const convertHundred = (n: number): string => {
//       let result = '';
//       if (n >= 100) {
//         result += ones[Math.floor(n / 100)] + ' Hundred ';
//         n %= 100;
//       }
//       if (n >= 20) {
//         result += tens[Math.floor(n / 10)] + ' ';
//         n %= 10;
//       } else if (n >= 10) {
//         result += teens[n - 10] + ' ';
//         return result.trim();
//       }
//       result += ones[n];
//       return result.trim();
//     };

//     const parts: string[] = [];
//     let scaleIndex = 0;

//     while (num > 0 && scaleIndex < scales.length) {
//       const part = num % 1000;
//       if (part !== 0) {
//         const partWords = convertHundred(part);
//         parts.unshift(
//           partWords + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '')
//         );
//       }
//       num = Math.floor(num / 1000);
//       scaleIndex++;
//     }

//     return parts.join(' ').trim() + ' Only';
//   } catch (error) {
//     console.log('Error converting number to words:', error);
//     return 'Unable to Convert';
//   }
// };

// // ─── Component ────────────────────────────────────────────────────────────────
// const BillDetailsScreen: React.FC<BillDetailsScreenProps> = ({ route, navigation }) => {
//   // ✅ FIX 1: Validate route params exist
//   const { bill, bills, orgid, studentId, studentData } = route?.params || {};

//   // ✅ FIX 2: Validate required params before rendering
//   if (!bill || !orgid || !studentId) {
//     return (
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Details</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Error: Missing required parameters</Text>
//           <TouchableOpacity
//             style={styles.retryBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.retryBtnText}>Go Back</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const [billDetails, setBillDetails] = useState<BillDetailData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDownloading, setIsDownloading] = useState(false);

//   /**
//    * Fetch detailed bill information
//    */
//   const getBillDetail = useCallback(async () => {
//     if (!bill || !bill.billNo || !bill.billDate) {
//       Alert.alert('Error', 'Invalid bill data');
//       navigation.goBack();
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Convert date format DD-MM-YYYY to YYYY-MM-DD
//       const [day, month, year] = bill.billDate.split('-');
//       const formattedDate = `${year}-${month}-${day}`;

//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/fee_bill_print_api`,
//         null,
//         {
//           params: {
//             orgId: bill.orgId,
//             billNo: bill.billNo,
//             billDate: formattedDate,
//           },
//           timeout: 10000,
//         }
//       );
// console.log(response.data.data,'-----------response.data.data')
//       if (response?.data?.isSuccess && response?.data?.data) {
//         setBillDetails(Array.isArray(response.data.data) ? response.data.data : []);
//       } else {
//         Alert.alert('Error', 'No data found for this bill');
//       }
//     } catch (error) {
//       console.log('Error fetching bill detail:', error);
//       Alert.alert('Error', 'Failed to load bill details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [bill, navigation]);

//   // ✅ FIX 3: Use useEffect to fetch data on mount
//   React.useEffect(() => {
//     getBillDetail();
//   }, [getBillDetail]);

//   /**
//    * Generate professional PDF HTML content
//    */
//   const generateBillHTML = (billData: BillDetailData[]): string => {
//     if (!billData || billData.length === 0) {
//       return '<html><body><p>No data available</p></body></html>';
//     }

//     try {
//       const firstRecord = billData[0];
//       const totalFeeAmount = billData.reduce(
//         (sum, item) => sum + (parseFloat(item.fee_amount) || 0),
//         0
//       );
//       const totalPaidAmount = billData.reduce(
//         (sum, item) => sum + (parseFloat(item.paid_amount) || 0),
//         0
//       );
//       const totalPending = billData.reduce(
//         (sum, item) => sum + (parseFloat(item.pending_amt) || 0),
//         0
//       );

//       const tableRows = billData
//         .map((item, index) => `
//           <tr>
//             <td style="border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px;">${index + 1}</td>
//             <td style="border: 1px solid #000; padding: 8px; font-size: 14px;">Fee Item ${index + 1}</td>
//             <td style="border: 1px solid #000; padding: 8px; text-align: right; font-size: 14px;">₹${parseFloat(item.fee_amount || '0').toFixed(2)}</td>
//           </tr>
//         `)
//         .join('');

//       const amountInWords = convertNumberToWords(Math.round(totalPaidAmount));
//       const currentDate = new Date().toLocaleDateString('en-IN', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       });

//       return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <style>
//             * {
//               margin: 0;
//               padding: 0;
//               box-sizing: border-box;
//             }
//             body {
//               font-family: Arial, sans-serif;
//               background: white;
//               padding: 20px;
//             }
//             .container {
//               max-width: 900px;
//               margin: 0 auto;
//               background: white;
//               padding: 20px;
//             }
//             .header {
//               text-align: center;
//               border-bottom: 3px solid #333;
//               padding-bottom: 15px;
//               margin-bottom: 20px;
//             }
//             .school-name {
//               font-size: 24px;
//               font-weight: bold;
//               color: #333;
//               margin-bottom: 5px;
//             }
//             .school-address {
//               font-size: 12px;
//               color: #666;
//               margin-bottom: 3px;
//             }
//             .receipt-title {
//               background: #cccccc;
//               padding: 10px;
//               font-size: 18px;
//               font-weight: bold;
//               text-align: center;
//               margin: 15px 0;
//               border: 2px solid #333;
//             }
//             .info-section {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 15px;
//               padding: 0 10px;
//             }
//             .info-column {
//               flex: 1;
//             }
//             .info-row {
//               display: flex;
//               margin-bottom: 8px;
//               font-size: 13px;
//             }
//             .info-label {
//               font-weight: bold;
//               width: 120px;
//               color: #333;
//             }
//             .info-value {
//               flex: 1;
//               color: #333;
//             }
//             .info-divider {
//               color: #333;
//               margin: 0 5px;
//             }
//             .table-container {
//               margin: 20px 0;
//               border: 2px solid #000;
//             }
//             table {
//               width: 100%;
//               border-collapse: collapse;
//             }
//             th {
//               background: #f5f5f5;
//               border: 1px solid #000;
//               padding: 10px;
//               text-align: left;
//               font-weight: bold;
//               font-size: 14px;
//               color: #333;
//             }
//             td {
//               border: 1px solid #000;
//               padding: 8px;
//               font-size: 13px;
//               color: #333;
//             }
//             .total-row {
//               background: #cccccc;
//               font-weight: bold;
//               font-size: 14px;
//             }
//             .total-row td {
//               padding: 12px;
//             }
//             .amount-in-words {
//               border: 2px solid #000;
//               padding: 15px;
//               margin: 15px 0;
//               font-size: 14px;
//               font-weight: bold;
//               color: #333;
//             }
//             .summary-section {
//               margin: 15px 0;
//               padding: 15px;
//               border: 1px solid #ddd;
//             }
//             .summary-row {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 8px;
//               font-size: 13px;
//             }
//             .summary-label {
//               font-weight: bold;
//               color: #333;
//             }
//             .summary-value {
//               color: #333;
//             }
//             .footer {
//               margin-top: 30px;
//               text-align: center;
//               font-size: 11px;
//               color: #666;
//               border-top: 1px solid #ccc;
//               padding-top: 10px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <div class="school-name">Vijayanta Matriculation School</div>
//               <div class="school-address">Street, Chennai</div>
//               <div class="school-address">T.Nager, Chennai, 600063</div>
//             </div>
//             <div class="receipt-title">FEE RECEIPT</div>
//             <div class="info-section">
//               <div class="info-column">
//                 <div class="info-row">
//                   <span class="info-label">Bill No</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.bill_no || 'N/A'}</span>
//                 </div>
//                 <div class="info-row">
//                   <span class="info-label">Name</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.student_name || 'N/A'}</span>
//                 </div>
//                 <div class="info-row">
//                   <span class="info-label">Roll No</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.roll_no || 'N/A'}</span>
//                 </div>
//               </div>
//               <div class="info-column">
//                 <div class="info-row">
//                   <span class="info-label">Bill Date</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.bill_date || 'N/A'}</span>
//                 </div>
//                 <div class="info-row">
//                   <span class="info-label">Class</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.std_name || ''} ${firstRecord.section || ''}</span>
//                 </div>
//               </div>
//             </div>
//             <div class="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th style="width: 80px; text-align: center;">Sl.No</th>
//                     <th style="flex: 1;">Fee Particulars</th>
//                     <th style="width: 150px; text-align: right;">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${tableRows}
//                   <tr class="total-row">
//                     <td colspan="2" style="text-align: left;">Total Amount</td>
//                     <td style="text-align: right;">₹${totalFeeAmount.toFixed(2)}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div class="amount-in-words">
//               Amount (In Words) : ${amountInWords}
//             </div>
//             <div class="summary-section">
//               <div class="summary-row">
//                 <span class="summary-label">Total Fee Amount:</span>
//                 <span class="summary-value">₹${totalFeeAmount.toFixed(2)}</span>
//               </div>
//               <div class="summary-row">
//                 <span class="summary-label">Total Paid Amount:</span>
//                 <span class="summary-value">₹${totalPaidAmount.toFixed(2)}</span>
//               </div>
//               <div class="summary-row">
//                 <span class="summary-label">Total Pending:</span>
//                 <span class="summary-value">₹${totalPending.toFixed(2)}</span>
//               </div>
//             </div>
//             <div class="footer">
//               <p>Generated on ${currentDate}</p>
//               <p>This is a computer-generated receipt. No signature required.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `;
//     } catch (error) {
//       console.log('Error generating HTML:', error);
//       return '<html><body><p>Error generating receipt</p></body></html>';
//     }
//   };

//   /**
//    * Download bill receipt as PDF
//    */
//   const downloadBillReceipt = async (): Promise<void> => {
//     if (!bill || !billDetails || billDetails.length === 0) {
//       Alert.alert('Error', 'No bill data available to download.');
//       return;
//     }

//     setIsDownloading(true);
//     try {
//       const htmlContent = generateBillHTML(billDetails);
      
//       if (!htmlContent || htmlContent.trim().length === 0) {
//         throw new Error('HTML content is empty');
//       }

//       const fileName = `Bill_${bill.billNo}_${bill.billDate.replace(/\//g, '-')}`;

//       const pdf = await generatePDF({
//         html: htmlContent,
//         fileName: fileName,
//         base64: false,
//       });

//       if (pdf && pdf.filePath) {
//         const destinationPath = Platform.OS === 'android'
//           ? `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`
//           : `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;

//         await RNFS.copyFile(pdf.filePath, destinationPath);

//         try {
//           await Share.open({
//             url: Platform.OS === 'android' 
//               ? `file://${destinationPath}` 
//               : destinationPath,
//             type: 'application/pdf',
//             title: 'Share Bill Receipt',
//             message: 'Here is your bill receipt',
//             failOnCancel: false,
//           });
//         } catch (shareError) {
//           console.log('Share cancelled or error:', shareError);
//         }

//         Alert.alert(
//           'Success',
//           Platform.OS === 'android'
//             ? `Bill receipt downloaded!\n\nFile: ${fileName}.pdf\n\nLocation: Downloads folder`
//             : `Bill receipt generated!\n\nFile: ${fileName}.pdf`,
//           [{ text: 'OK', onPress: () => {} }]
//         );
//       } else {
//         Alert.alert('Error', 'Failed to generate PDF file. Please try again.');
//       }
//     } catch (error) {
//       console.log('Error generating PDF:', error);
//       Alert.alert(
//         'Error',
//         `Failed to generate bill receipt.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
//       );
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const BillInfoRow = ({
//     label,
//     value,
//     highlight,
//     error,
//   }: {
//     label: string;
//     value: string;
//     highlight?: boolean;
//     error?: boolean;
//   }) => (
//     <View style={styles.billInfoRow}>
//       <Text style={styles.billInfoLabel}>{label}</Text>
//       <Text
//         style={[
//           styles.billInfoValue,
//           highlight && styles.billInfoValueHighlight,
//           error && styles.billInfoValueError,
//         ]}
//       >
//         {value}
//       </Text>
//     </View>
//   );

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//         <Text style={styles.loaderText}>Loading bill details…</Text>
//       </View>
//     );
//   }

//   if (!billDetails || billDetails.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             // ✅ FIX 4: Navigate back to BillsList with all data
//             onPress={() => 
//               navigation.navigate('BillsList', {
//                 bills: bills || [],
//                 orgid,
//                 studentId,
//                 studentData,
//               })
//             }
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Details</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyTitle}>No Data</Text>
//           <Text style={styles.emptySubtitle}>
//             Bill details not available
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <>
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             // ✅ FIX 4: Navigate back to BillsList with all data
//             onPress={() => 
//               navigation.navigate('BillsList', {
//                 bills: bills || [],
//                 orgid,
//                 studentId,
//                 studentData,
//               })
//             }
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Details</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>

//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.contentCard}>
//             {/* Bill Header */}
//             <View style={styles.billDetailHeader}>
//               <Text style={styles.billDetailTitle}>
//                 Bill Receipt {billDetails[0]?.bill_no}
//               </Text>
//               <Text style={styles.billDetailDate}>
//                 {billDetails[0]?.bill_date}
//               </Text>
//             </View>

//             {/* Student Info */}
//             <View style={styles.billSection}>
//               <Text style={styles.sectionTitle}>
//                 Student Information
//               </Text>
//               <BillInfoRow
//                 label="Name"
//                 value={billDetails[0]?.student_name || 'N/A'}
//               />
//               <BillInfoRow
//                 label="Roll No"
//                 value={billDetails[0]?.roll_no || 'N/A'}
//               />
//               <BillInfoRow
//                 label="Class"
//                 value={`${billDetails[0]?.std_name || ''} - ${billDetails[0]?.section || ''}`}
//               />
//             </View>

//             {/* Fee Details */}
//             <View style={styles.billSection}>
//               <Text style={styles.sectionTitle}>
//                 Fee Details
//               </Text>
//               {billDetails.map((item, index) => (
//                 <View
//                   key={`fee-detail-${index}`}
//                   style={styles.feeDetailCard}
//                 >
//                   <View style={styles.feeDetailRow}>
//                     <Text style={styles.feeDetailLabel}>
//                      {item.fee_name}
//                     </Text>
//                   </View>
//                   <BillInfoRow
//                     label="Fee Amount"
//                     value={`₹ ${parseFloat(item.fee_amount || '0').toFixed(2)}`}
//                   />
//                   <BillInfoRow
//                     label="Paid Amount"
//                     value={`₹ ${parseFloat(item.paid_amount || '0').toFixed(2)}`}
//                     highlight={parseFloat(item.paid_amount || '0') > 0}
//                   />
//                   <BillInfoRow
//                     label="Pending"
//                     value={`₹ ${parseFloat(item.pending_amt || '0').toFixed(2)}`}
//                     error={parseFloat(item.pending_amt || '0') > 0}
//                   />
//                 </View>
//               ))}
//             </View>

//             {/* Summary */}
//             <View style={styles.billSection}>
//               <Text style={styles.sectionTitle}>
//                 Summary
//               </Text>
//               <View style={styles.summaryCard}>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>
//                     Total Fee Amount:
//                   </Text>
//                   <Text style={styles.summaryValue}>
//                     ₹
//                     {billDetails
//                       .reduce(
//                         (sum, item) =>
//                           sum +
//                           parseFloat(item.fee_amount || '0'),
//                         0
//                       )
//                       .toFixed(2)}
//                   </Text>
//                 </View>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>
//                     Total Paid Amount:
//                   </Text>
//                   <Text
//                     style={[
//                       styles.summaryValue,
//                       { color: COLORS.success },
//                     ]}
//                   >
//                     ₹
//                     {billDetails
//                       .reduce(
//                         (sum, item) =>
//                           sum +
//                           parseFloat(item.paid_amount || '0'),
//                         0
//                       )
//                       .toFixed(2)}
//                   </Text>
//                 </View>
//                 <View
//                   style={[
//                     styles.summaryRow,
//                     styles.summaryRowBorder,
//                   ]}
//                 >
//                   <Text style={styles.summaryLabel}>
//                     Total Pending:
//                   </Text>
//                   <Text
//                     style={[
//                       styles.summaryValue,
//                       {
//                         color:
//                           billDetails.reduce(
//                             (sum, item) =>
//                               sum +
//                               parseFloat(item.pending_amt || '0'),
//                             0
//                           ) > 0
//                             ? COLORS.error
//                             : COLORS.success,
//                       },
//                     ]}
//                   >
//                     ₹
//                     {billDetails
//                       .reduce(
//                         (sum, item) =>
//                           sum +
//                           parseFloat(item.pending_amt || '0'),
//                         0
//                       )
//                       .toFixed(2)}
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* Download Button */}
//             <TouchableOpacity
//               style={styles.downloadBtn}
//               activeOpacity={0.85}
//               onPress={downloadBillReceipt}
//               disabled={isDownloading}
//             >
//               {isDownloading ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />
//               ) : (
//                 <>
//                   <MaterialIcons
//                     name="download"
//                     size={normalize(16)}
//                     color="#fff"
//                   />
//                   <Text style={styles.payBtnText}>
//                     Download PDF Receipt
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>

//             <View style={{ height: hp(4) }} />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.primaryDark,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     backgroundColor: '#ffffff',
//     paddingBottom: hp(2),
//   },
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: '#F8F7FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loaderText: {
//     fontSize: clamp(normalize(14), 12, 16),
//     color: COLORS.textSecondary,
//     letterSpacing: 0.3,
//     marginTop: hp(2),
//   },
//   header: {
//     backgroundColor: COLORS.primaryDark,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(1.6),
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: clamp(normalize(18), 15, 20),
//     fontFamily: fonts.FONT_BOLD,
//     letterSpacing: 0.5,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: wp(4),
//   },
//   errorText: {
//     fontSize: clamp(normalize(16), 14, 18),
//     color: COLORS.error,
//     textAlign: 'center',
//     marginBottom: hp(2),
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   retryBtn: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: wp(6),
//     paddingVertical: hp(1.5),
//     borderRadius: normalize(12),
//   },
//   retryBtnText: {
//     color: '#fff',
//     fontSize: clamp(normalize(14), 12, 16),
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   contentCard: {
//     marginHorizontal: wp(4),
//     marginTop: hp(2),
//     borderRadius: normalize(20),
//     backgroundColor: '#eeeaeaf3',
//     overflow: 'hidden',
//     shadowColor: 'rgba(0,0,0,0.10)',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 1,
//     shadowRadius: 10,
//     elevation: 5,
//     padding: wp(4),
//   },
//   billDetailHeader: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: COLORS.divider,
//     paddingBottom: hp(1.5),
//     marginBottom: hp(1.5),
//   },
//   billDetailTitle: {
//     fontSize: clamp(normalize(18), 16, 22),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.primary,
//     marginBottom: hp(0.5),
//   },
//   billDetailDate: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textSecondary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   billSection: {
//     marginBottom: hp(2),
//   },
//   sectionTitle: {
//     fontSize: clamp(normalize(14), 13, 16),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.primary,
//     marginBottom: hp(1),
//     paddingHorizontal: wp(3),
//   },
//   billInfoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: hp(0.8),
//     paddingHorizontal: wp(3),
//     borderBottomWidth: 0.5,
//     borderBottomColor: COLORS.divider,
//   },
//   billInfoLabel: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textSecondary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   billInfoValue: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textPrimary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   billInfoValueHighlight: {
//     color: COLORS.success,
//   },
//   billInfoValueError: {
//     color: COLORS.error,
//   },
//   feeDetailCard: {
//     backgroundColor: 'rgba(255,255,255,0.6)',
//     borderRadius: normalize(10),
//     padding: wp(3),
//     marginBottom: hp(1),
//     borderLeftWidth: 4,
//     borderLeftColor: COLORS.primary,
//   },
//   feeDetailRow: {
//     marginBottom: hp(0.8),
//   },
//   feeDetailLabel: {
//     fontSize: clamp(normalize(13), 12, 15),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.primary,
//   },
//   summaryCard: {
//     backgroundColor: COLORS.primaryLight,
//     borderRadius: normalize(12),
//     borderWidth: 1.5,
//     borderColor: COLORS.primary,
//     padding: wp(4),
//     overflow: 'hidden',
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: hp(1),
//   },
//   summaryRowBorder: {
//     borderTopWidth: 1.5,
//     borderTopColor: COLORS.divider,
//     paddingTop: hp(1.5),
//     marginTop: hp(0.5),
//   },
//   summaryLabel: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textSecondary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   summaryValue: {
//     fontSize: clamp(normalize(13), 12, 15),
//     color: COLORS.textPrimary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   downloadBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.primary,
//     marginTop: hp(2),
//     borderRadius: normalize(16),
//     paddingVertical: hp(1.8),
//     gap: wp(2),
//     shadowColor: 'rgba(0,0,0,0.2)',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 1,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   payBtnText: {
//     color: '#fff',
//     fontSize: clamp(normalize(15), 13, 17),
//     fontFamily: fonts.ROBOTO_BOLD,
//     letterSpacing: 0.4,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyTitle: {
//     fontSize: clamp(normalize(20), 18, 24),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.textPrimary,
//     marginBottom: hp(0.8),
//   },
//   emptySubtitle: {
//     fontSize: clamp(normalize(13), 12, 15),
//     color: COLORS.textSecondary,
//     textAlign: 'center',
//   },
// });

// export default BillDetailsScreen;

// import React, { useState, useCallback, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Platform,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaterialIcons from '@react-native-vector-icons/material-icons';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { fonts } from '../root/config';
// import { generatePDF } from 'react-native-html-to-pdf';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // ─── Responsive helpers ──────────────────────────────────────────────────────
// const { width, height } = Dimensions.get('window');

// const BASE_WIDTH = 360;
// const scale = width / BASE_WIDTH;
// const normalize = (size: number) => Math.round(size * scale);

// const wp = (pct: number) => (width * pct) / 100;
// const hp = (pct: number) => (height * pct) / 100;

// const clamp = (val: number, min: number, max: number) =>
//   Math.min(Math.max(val, min), max);

// // ─── Design tokens ────────────────────────────────────────────────────────────
// const COLORS = {
//   primary: '#6A1B9A',
//   primaryDark: '#6A1B9A',
//   primaryLight: '#ffffff',
//   textPrimary: '#1E1B4B',
//   textSecondary: '#6B7280',
//   divider: '#E5E7EB',
//   success: '#10B981',
//   error: '#EF4444',
//   shadow: 'rgba(124, 58, 237, 0.18)',
// };

// // ─── Interfaces ───────────────────────────────────────────────────────────────
// interface BillData {
//   billNo: string;
//   billDate: string;
//   amount: string;
//   orgId: string;
// }

// interface BillDetailData {
//   stud_profile_Id: string;
//   student_name: string;
//   roll_no: string;
//   std_name: string;
//   section: string;
//   bill_no: string;
//   bill_date: string;
//   fee_name: string;
//   fee_amount: string;
//   paid_amount: string;
//   pending_amt: string;
//   admission_no?: string;
//   father_name?: string;
//   dob?: string;
// }

// interface BillDetailsScreenProps {
//   route: any;
//   navigation: any;
// }

// interface StudentData {
//   id: string;
//   name: string;
//   std: string;
//   section: string;
//   roll: string;
// }

// // ─── Number to Words Utility ──────────────────────────────────────────────────
// const convertNumberToWords = (num: number): string => {
//   try {
//     if (num === 0) return 'Zero Only';
//     if (num < 0) return 'Invalid Amount';

//     const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//     const scales = ['', 'Thousand', 'Million', 'Billion'];

//     const convertHundred = (n: number): string => {
//       let result = '';
//       if (n >= 100) {
//         result += ones[Math.floor(n / 100)] + ' Hundred ';
//         n %= 100;
//       }
//       if (n >= 20) {
//         result += tens[Math.floor(n / 10)] + ' ';
//         n %= 10;
//       } else if (n >= 10) {
//         result += teens[n - 10] + ' ';
//         return result.trim();
//       }
//       result += ones[n];
//       return result.trim();
//     };

//     const parts: string[] = [];
//     let scaleIndex = 0;

//     while (num > 0 && scaleIndex < scales.length) {
//       const part = num % 1000;
//       if (part !== 0) {
//         const partWords = convertHundred(part);
//         parts.unshift(
//           partWords + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '')
//         );
//       }
//       num = Math.floor(num / 1000);
//       scaleIndex++;
//     }

//     return parts.join(' ').trim() + ' Only';
//   } catch (error) {
//     console.log('Error converting number to words:', error);
//     return 'Unable to Convert';
//   }
// };


// const BillDetailsScreen: React.FC<BillDetailsScreenProps> = ({ route, navigation }) => {

//   const { bill, bills, orgid, studentId, studentData } = route?.params || {};

//   const [billDetails, setBillDetails] = useState<BillDetailData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [orgList, setOrgList] = useState<any[]>([]);

//     const loadInstitutes = async () => {
//     try {
//       const storedMobile = await AsyncStorage.getItem("mobile")
// console.log(storedMobile,'=========store')
//       const url = `https://www.vtsmile.in/app/api/students/institute_list_api?mobile_no=${storedMobile}`;
//       const response = await axios.post(url);

//       if (response.status === 200 && response.data?.isSuccess) {
//         setOrgList(response.data.orgList || []);
//         console.log('response.data.orgList==>', response.data.orgList);
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   // ✅ FIX 2: Validate required params before rendering
//   if (!bill || !orgid || !studentId) {
//     return (
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Details</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Error: Missing required parameters</Text>
//           <TouchableOpacity
//             style={styles.retryBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.retryBtnText}>Go Back</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }


//   const getBillDetail = useCallback(async () => {
//     if (!bill || !bill.billNo || !bill.billDate) {
//       Alert.alert('Error', 'Invalid bill data');
//       navigation.goBack();
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Convert date format DD-MM-YYYY to YYYY-MM-DD
//       const [day, month, year] = bill.billDate.split('-');
//       const formattedDate = `${year}-${month}-${day}`;

//       const response = await axios.post(
//         `https://www.vtsmile.in/app/api/students/fee_bill_print_api`,
//         null,
//         {
//           params: {
//             orgId: bill.orgId,
//             billNo: bill.billNo,
//             billDate: formattedDate,
//           },
//           timeout: 10000,
//         }
//       );

//       console.log(response.data.data, '-----------response.data.data');

//       if (response?.data?.isSuccess && response?.data?.data) {
//         setBillDetails(Array.isArray(response.data.data) ? response.data.data : []);
//       } else {
//         Alert.alert('Error', 'No data found for this bill');
//       }
//     } catch (error) {
//       console.log('Error fetching bill detail:', error);
//       Alert.alert('Error', 'Failed to load bill details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [bill, navigation]);

//   // ✅ FIX 3: Use useEffect to fetch data on mount
//   useEffect(() => {
//     getBillDetail();
//   }, [getBillDetail]);

//   /**
//    * IMPROVED: Generate professional PDF HTML with proper paid amount breakdown
//    */
//   const generateBillHTML = (billData: BillDetailData[]): string => {
//     if (!billData || billData.length === 0) {
//       return '<html><body><p>No data available</p></body></html>';
//     }

//     try {
//       const firstRecord = billData[0];

//       // Calculate totals
//       const totalPaidAmount = billData.reduce(
//         (sum, item) => sum + (parseFloat(item.paid_amount) || 0),
//         0
//       );

//       // SIMPLIFIED: Generate fee table with only Fees Particulars and Paid Amount
//       const tableRows = billData
//         .map((item, index) => {
//           const paidAmt = parseFloat(item.paid_amount || '0');

//           return `
//             <tr>
//               <td class="table-cell-left">${item.fee_name || `Fee Item ${index + 1}`}</td>
//               <td class="table-cell-right">₹${paidAmt.toFixed(2)}</td>
//             </tr>
//           `;
//         })
//         .join('');

//       const amountInWords = convertNumberToWords(Math.round(totalPaidAmount));
//       const currentDate = new Date().toLocaleDateString('en-IN', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       });

//       return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <style>
//             * {
//               margin: 0;
//               padding: 0;
//               box-sizing: border-box;
//             }
//             body {
//               font-family: 'Arial', sans-serif;
//               background: white;
//               padding: 15px;
//               font-size: 13px;
//             }
//             .container {
//               max-width: 900px;
//               margin: 0 auto;
//               background: white;
//             }
//             .header {
//               text-align: center;
//               border-bottom: 3px solid #333;
//               padding-bottom: 12px;
//               margin-bottom: 15px;
//             }
//             .school-logo {
//               text-align: center;
//               margin-bottom: 8px;
//             }
//             .school-name {
//               font-size: 22px;
//               font-weight: bold;
//               color: #000;
//               margin-bottom: 3px;
//             }
//             .school-address {
//               font-size: 11px;
//               color: #333;
//               margin-bottom: 2px;
//               line-height: 1.4;
//             }
//             .receipt-title {
//               background: #cccccc;
//               padding: 8px;
//               font-size: 16px;
//               font-weight: bold;
//               text-align: center;
//               margin: 12px 0;
//               border: 2px solid #000;
//             }
//             .info-grid {
//               display: grid;
//               grid-template-columns: 1fr 1fr;
//               gap: 15px;
//               margin-bottom: 15px;
//               padding: 0 5px;
//             }
//             .info-row {
//               display: flex;
//               margin-bottom: 6px;
//               font-size: 12px;
//             }
//             .info-label {
//               font-weight: bold;
//               width: 130px;
//               color: #000;
//               min-width: 130px;
//             }
//             .info-divider {
//               color: #000;
//               margin: 0 5px;
//               font-weight: bold;
//             }
//             .info-value {
//               flex: 1;
//               color: #000;
//             }
//             .table-container {
//               margin: 15px 0;
//               border: 2px solid #000;
//               overflow: hidden;
//             }
//             table {
//               width: 100%;
//               border-collapse: collapse;
//             }
//             thead tr {
//               background: #d9d9d9;
//             }
//             th {
//               border: 1px solid #000;
//               padding: 8px;
//               text-align: center;
//               font-weight: bold;
//               font-size: 12px;
//               color: #000;
//             }
//             td {
//               border: 1px solid #000;
//               padding: 7px;
//               font-size: 12px;
//               color: #000;
//             }
//             .table-cell-left {
//               text-align: left;
//               font-weight: 500;
//             }
//             .table-cell-right {
//               text-align: right;
//               font-family: 'Courier New', monospace;
//               width: 120px;
//             }
//             .total-row {
//               background: #e8e8e8;
//               font-weight: bold;
//             }
//             .total-row td {
//               padding: 10px;
//               font-size: 13px;
//             }
//             .amount-in-words {
//               border: 2px solid #000;
//               padding: 12px;
//               margin: 15px 0;
//               font-size: 13px;
//               font-weight: bold;
//               color: #000;
//               background: #f9f9f9;
//             }
//             .summary-section {
//               margin: 15px 0;
//               padding: 12px;
//               border: 1px solid #999;
//               background: #f5f5f5;
//             }
//             .summary-row {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 7px;
//               font-size: 12px;
//             }
//             .summary-row:last-child {
//               margin-bottom: 0;
//             }
//             .summary-label {
//               font-weight: bold;
//               color: #000;
//             }
//             .summary-value {
//               color: #000;
//               font-family: 'Courier New', monospace;
//               font-weight: bold;
//               text-align: right;
//               flex: 0 0 auto;
//               margin-left: 20px;
//             }
//             .divider-line {
//               border-top: 1px solid #999;
//               margin: 7px 0;
//             }
//             .footer {
//               margin-top: 20px;
//               text-align: center;
//               font-size: 11px;
//               color: #666;
//               border-top: 1px solid #ccc;
//               padding-top: 8px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <div class="school-logo">${Item.orgLogo}</div>
//               <div class="school-name">${item.orgName}</div>
//               <div class="school-address">${item.orgArea}</div>
//               <div class="school-address">${item.orgCity}</div>
//             </div>

//             <div class="receipt-title">FEE RECEIPT</div>

//             <div class="info-grid">
//               <div>
//                 <div class="info-row">
//                   <span class="info-label">Bill No</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.bill_no || 'N/A'}</span>
//                 </div>
//                 ${firstRecord.admission_no ? `
//                 <div class="info-row">
//                   <span class="info-label">Admission No</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.admission_no}</span>
//                 </div>
//                 ` : ''}
//                 <div class="info-row">
//                   <span class="info-label">Name</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.student_name || 'N/A'}</span>
//                 </div>
//                 <div class="info-row">
//                   <span class="info-label">Roll No</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.roll_no || 'N/A'}</span>
//                 </div>
//                 ${firstRecord.dob ? `
//                 <div class="info-row">
//                   <span class="info-label">Date of Birth</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.dob}</span>
//                 </div>
//                 ` : ''}
//               </div>
//               <div>
//                 <div class="info-row">
//                   <span class="info-label">Bill Date</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.bill_date || 'N/A'}</span>
//                 </div>
//                 ${firstRecord.father_name ? `
//                 <div class="info-row">
//                   <span class="info-label">Father Name</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.father_name}</span>
//                 </div>
//                 ` : ''}
//                 <div class="info-row">
//                   <span class="info-label">Class</span>
//                   <span class="info-divider">:</span>
//                   <span class="info-value">${firstRecord.std_name || ''} - ${firstRecord.section || ''}</span>
//                 </div>
//               </div>
//             </div>

//             <div class="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th style="flex: 1;">Fees Particulars</th>
//                     <th style="width: 120px;">Paid Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${tableRows}
//                   <tr class="total-row">
//                     <td style="text-align: left; font-weight: bold;">Total Paid Amount</td>
//                     <td class="table-cell-right">₹${totalPaidAmount.toFixed(2)}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             <div class="amount-in-words">
//               Amount (In Words): ${amountInWords}
//             </div>

//             <div class="summary-section">
//               <div class="summary-row">
//                 <span class="summary-label">Total Paid Amount:</span>
//                 <span class="summary-value">₹${totalPaidAmount.toFixed(2)}</span>
//               </div>
//             </div>

//             <div class="footer">
//               <p>Generated on ${currentDate}</p>
//               <p>This is a computer-generated receipt. No signature required.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `;
//     } catch (error) {
//       console.log('Error generating HTML:', error);
//       return '<html><body><p>Error generating receipt</p></body></html>';
//     }
//   };
  

//   /**
//    * Download bill receipt as PDF
//    */
//   const downloadBillReceipt = async (): Promise<void> => {
//     if (!bill || !billDetails || billDetails.length === 0) {
//       Alert.alert('Error', 'No bill data available to download.');
//       return;
//     }

//     setIsDownloading(true);
//     try {
//       const htmlContent = generateBillHTML(billDetails);

//       if (!htmlContent || htmlContent.trim().length === 0) {
//         throw new Error('HTML content is empty');
//       }

//       const fileName = `Bill_${bill.billNo}_${bill.billDate.replace(/\//g, '-')}`;

//       const pdf = await generatePDF({
//         html: htmlContent,
//         fileName: fileName,
//         base64: false,
//       });

//       if (pdf && pdf.filePath) {
//         const destinationPath = Platform.OS === 'android'
//           ? `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`
//           : `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;

//         await RNFS.copyFile(pdf.filePath, destinationPath);

//         try {
//           await Share.open({
//             url: Platform.OS === 'android'
//               ? `file://${destinationPath}`
//               : destinationPath,
//             type: 'application/pdf',
//             title: 'Share Bill Receipt',
//             message: 'Here is your bill receipt',
//             failOnCancel: false,
//           });
//         } catch (shareError) {
//           console.log('Share cancelled or error:', shareError);
//         }

//         Alert.alert(
//           'Success',
//           Platform.OS === 'android'
//             ? `Bill receipt downloaded!\n\nFile: ${fileName}.pdf\n\nLocation: Downloads folder`
//             : `Bill receipt generated!\n\nFile: ${fileName}.pdf`,
//           [{ text: 'OK', onPress: () => { } }]
//         );
//       } else {
//         Alert.alert('Error', 'Failed to generate PDF file. Please try again.');
//       }
//     } catch (error) {
//       console.log('Error generating PDF:', error);
//       Alert.alert(
//         'Error',
//         `Failed to generate bill receipt.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
//       );
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const BillInfoRow = ({
//     label,
//     value,
//     highlight,
//     error,
//   }: {
//     label: string;
//     value: string;
//     highlight?: boolean;
//     error?: boolean;
//   }) => (
//     <View style={styles.billInfoRow}>
//       <Text style={styles.billInfoLabel}>{label}</Text>
//       <Text
//         style={[
//           styles.billInfoValue,
//           highlight && styles.billInfoValueHighlight,
//           error && styles.billInfoValueError,
//         ]}
//       >
//         {value}
//       </Text>
//     </View>
//   );

//   useEffect(() => {
//     loadInstitutes();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//         <Text style={styles.loaderText}>Loading bill details…</Text>
//       </View>
//     );
//   }

//   if (!billDetails || billDetails.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate('BillsList', {
//                 bills: bills || [],
//                 orgid,
//                 studentId,
//                 studentData,
//               })
//             }
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Details</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyTitle}>No Data</Text>
//           <Text style={styles.emptySubtitle}>
//             Bill details not available
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <>
//       <SafeAreaView style={styles.safeArea} edges={['top']}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate('BillsList', {
//                 bills: bills || [],
//                 orgid,
//                 studentId,
//                 studentData,
//               })
//             }
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Icon
//               name="arrow-back"
//               size={normalize(24)}
//               color="#fff"
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bill Details</Text>
//           <View style={{ width: normalize(40) }} />
//         </View>

//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.contentCard}>
//             {/* Bill Header */}
//             <View style={styles.billDetailHeader}>
//               <Text style={styles.billDetailTitle}>
//                 Bill Receipt {billDetails[0]?.bill_no}
//               </Text>
//               <Text style={styles.billDetailDate}>
//                 {billDetails[0]?.bill_date}
//               </Text>
//             </View>

//             {/* Student Info */}
//             <View style={styles.billSection}>
//               <Text style={styles.sectionTitle}>
//                 Student Information
//               </Text>
//               <BillInfoRow
//                 label="Name"
//                 value={billDetails[0]?.student_name || 'N/A'}
//               />
//               <BillInfoRow
//                 label="Roll No"
//                 value={billDetails[0]?.roll_no || 'N/A'}
//               />
//               <BillInfoRow
//                 label="Class"
//                 value={`${billDetails[0]?.std_name || ''} - ${billDetails[0]?.section || ''}`}
//               />
//             </View>

//             {/* Fee Details */}
//             <View style={styles.billSection}>
//               <Text style={styles.sectionTitle}>
//                 Fee Details
//               </Text>
//               {billDetails.map((item, index) => (
//                 <View
//                   key={`fee-detail-${index}`}
//                   style={styles.feeDetailCard}
//                 >
//                   <View style={styles.feeDetailRow}>
//                     <Text style={styles.feeDetailLabel}>
//                       {item.fee_name}
//                     </Text>
//                   </View>
//                   <BillInfoRow
//                     label="Fee Amount"
//                     value={`₹ ${parseFloat(item.fee_amount || '0').toFixed(2)}`}
//                   />
//                   <BillInfoRow
//                     label="Paid Amount"
//                     value={`₹ ${parseFloat(item.paid_amount || '0').toFixed(2)}`}
//                     highlight={parseFloat(item.paid_amount || '0') > 0}
//                   />
//                   <BillInfoRow
//                     label="Pending"
//                     value={`₹ ${parseFloat(item.pending_amt || '0').toFixed(2)}`}
//                     error={parseFloat(item.pending_amt || '0') > 0}
//                   />
//                 </View>
//               ))}
//             </View>

//             {/* Summary */}
//             <View style={styles.billSection}>
//               <Text style={styles.sectionTitle}>
//                 Summary
//               </Text>
//               <View style={styles.summaryCard}>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>
//                     Total Fee Amount:
//                   </Text>
//                   <Text style={styles.summaryValue}>
//                     ₹
//                     {billDetails
//                       .reduce(
//                         (sum, item) =>
//                           sum +
//                           parseFloat(item.fee_amount || '0'),
//                         0
//                       )
//                       .toFixed(2)}
//                   </Text>
//                 </View>
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>
//                     Total Paid Amount:
//                   </Text>
//                   <Text
//                     style={[
//                       styles.summaryValue,
//                       { color: COLORS.success },
//                     ]}
//                   >
//                     ₹
//                     {billDetails
//                       .reduce(
//                         (sum, item) =>
//                           sum +
//                           parseFloat(item.paid_amount || '0'),
//                         0
//                       )
//                       .toFixed(2)}
//                   </Text>
//                 </View>
//                 <View
//                   style={[
//                     styles.summaryRow,
//                     styles.summaryRowBorder,
//                   ]}
//                 >
//                   <Text style={styles.summaryLabel}>
//                     Total Pending:
//                   </Text>
//                   <Text
//                     style={[
//                       styles.summaryValue,
//                       {
//                         color:
//                           billDetails.reduce(
//                             (sum, item) =>
//                               sum +
//                               parseFloat(item.pending_amt || '0'),
//                             0
//                           ) > 0
//                             ? COLORS.error
//                             : COLORS.success,
//                       },
//                     ]}
//                   >
//                     ₹
//                     {billDetails
//                       .reduce(
//                         (sum, item) =>
//                           sum +
//                           parseFloat(item.pending_amt || '0'),
//                         0
//                       )
//                       .toFixed(2)}
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* Download Button */}
//             <TouchableOpacity
//               style={styles.downloadBtn}
//               activeOpacity={0.85}
//               onPress={downloadBillReceipt}
//               disabled={isDownloading}
//             >
//               {isDownloading ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />
//               ) : (
//                 <>
//                   <MaterialIcons
//                     name="download"
//                     size={normalize(16)}
//                     color="#fff"
//                   />
//                   <Text style={styles.payBtnText}>
//                     Download PDF Receipt
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>

//             <View style={{ height: hp(4) }} />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.primaryDark,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     backgroundColor: '#ffffff',
//     paddingBottom: hp(2),
//   },
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: '#F8F7FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loaderText: {
//     fontSize: clamp(normalize(14), 12, 16),
//     color: COLORS.textSecondary,
//     letterSpacing: 0.3,
//     marginTop: hp(2),
//   },
//   header: {
//     backgroundColor: COLORS.primaryDark,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(4),
//     paddingVertical: hp(1.6),
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: clamp(normalize(18), 15, 20),
//     fontFamily: fonts.FONT_BOLD,
//     letterSpacing: 0.5,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: wp(4),
//   },
//   errorText: {
//     fontSize: clamp(normalize(16), 14, 18),
//     color: COLORS.error,
//     textAlign: 'center',
//     marginBottom: hp(2),
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   retryBtn: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: wp(6),
//     paddingVertical: hp(1.5),
//     borderRadius: normalize(12),
//   },
//   retryBtnText: {
//     color: '#fff',
//     fontSize: clamp(normalize(14), 12, 16),
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   contentCard: {
//     marginHorizontal: wp(4),
//     marginTop: hp(2),
//     borderRadius: normalize(20),
//     backgroundColor: '#eeeaeaf3',
//     overflow: 'hidden',
//     shadowColor: 'rgba(0,0,0,0.10)',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 1,
//     shadowRadius: 10,
//     elevation: 5,
//     padding: wp(4),
//   },
//   billDetailHeader: {
//     borderBottomWidth: 1.5,
//     borderBottomColor: COLORS.divider,
//     paddingBottom: hp(1.5),
//     marginBottom: hp(1.5),
//   },
//   billDetailTitle: {
//     fontSize: clamp(normalize(18), 16, 22),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.primary,
//     marginBottom: hp(0.5),
//   },
//   billDetailDate: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textSecondary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   billSection: {
//     marginBottom: hp(2),
//   },
//   sectionTitle: {
//     fontSize: clamp(normalize(14), 13, 16),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.primary,
//     marginBottom: hp(1),
//     paddingHorizontal: wp(3),
//   },
//   billInfoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: hp(0.8),
//     paddingHorizontal: wp(3),
//     borderBottomWidth: 0.5,
//     borderBottomColor: COLORS.divider,
//   },
//   billInfoLabel: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textSecondary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   billInfoValue: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textPrimary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   billInfoValueHighlight: {
//     color: COLORS.success,
//   },
//   billInfoValueError: {
//     color: COLORS.error,
//   },
//   feeDetailCard: {
//     backgroundColor: 'rgba(255,255,255,0.6)',
//     borderRadius: normalize(10),
//     padding: wp(3),
//     marginBottom: hp(1),
//     borderLeftWidth: 4,
//     borderLeftColor: COLORS.primary,
//   },
//   feeDetailRow: {
//     marginBottom: hp(0.8),
//   },
//   feeDetailLabel: {
//     fontSize: clamp(normalize(13), 12, 15),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.primary,
//   },
//   summaryCard: {
//     backgroundColor: COLORS.primaryLight,
//     borderRadius: normalize(12),
//     borderWidth: 1.5,
//     borderColor: COLORS.primary,
//     padding: wp(4),
//     overflow: 'hidden',
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: hp(1),
//   },
//   summaryRowBorder: {
//     borderTopWidth: 1.5,
//     borderTopColor: COLORS.divider,
//     paddingTop: hp(1.5),
//     marginTop: hp(0.5),
//   },
//   summaryLabel: {
//     fontSize: clamp(normalize(12), 11, 14),
//     color: COLORS.textSecondary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   summaryValue: {
//     fontSize: clamp(normalize(13), 12, 15),
//     color: COLORS.textPrimary,
//     fontFamily: fonts.ROBOTO_BOLD,
//   },
//   downloadBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.primary,
//     marginTop: hp(2),
//     borderRadius: normalize(16),
//     paddingVertical: hp(1.8),
//     gap: wp(2),
//     shadowColor: 'rgba(0,0,0,0.2)',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 1,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   payBtnText: {
//     color: '#fff',
//     fontSize: clamp(normalize(15), 13, 17),
//     fontFamily: fonts.ROBOTO_BOLD,
//     letterSpacing: 0.4,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyTitle: {
//     fontSize: clamp(normalize(20), 18, 24),
//     fontFamily: fonts.ROBOTO_BOLD,
//     color: COLORS.textPrimary,
//     marginBottom: hp(0.8),
//   },
//   emptySubtitle: {
//     fontSize: clamp(normalize(13), 12, 15),
//     color: COLORS.textSecondary,
//     textAlign: 'center',
//   },
// });

// export default BillDetailsScreen;

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../root/config';
import { generatePDF } from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Responsive helpers ──────────────────────────────────────────────────────
const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 360;
const scale = width / BASE_WIDTH;
const normalize = (size: number) => Math.round(size * scale);

const wp = (pct: number) => (width * pct) / 100;
const hp = (pct: number) => (height * pct) / 100;

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

// ─── Design tokens ────────────────────────────────────────────────────────────
const COLORS = {
  primary: '#6A1B9A',
  primaryDark: '#6A1B9A',
  primaryLight: '#ffffff',
  textPrimary: '#1E1B4B',
  textSecondary: '#6B7280',
  divider: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',
  shadow: 'rgba(124, 58, 237, 0.18)',
};

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface BillData {
  billNo: string;
  billDate: string;
  amount: string;
  orgId: string;
}

interface BillDetailData {
  stud_profile_Id: string;
  student_name: string;
  roll_no: string;
  std_name: string;
  section: string;
  bill_no: string;
  bill_date: string;
  fee_name: string;
  fee_amount: string;
  paid_amount: string;
  pending_amt: string;
  admission_no?: string;
  father_name?: string;
  dob?: string;
}

interface SchoolData {
  orgName: string;
  orgArea: string;
  orgCity: string;
  orgLogo: string;
  orgId: string;
}

interface BillDetailsScreenProps {
  route: any;
  navigation: any;
}

interface StudentData {
  id: string;
  name: string;
  std: string;
  section: string;
  roll: string;
}

// ─── Number to Words Utility ──────────────────────────────────────────────────
const convertNumberToWords = (num: number): string => {
  try {
    if (num === 0) return 'Zero Only';
    if (num < 0) return 'Invalid Amount';

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion'];

    const convertHundred = (n: number): string => {
      let result = '';
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + ' ';
        n %= 10;
      } else if (n >= 10) {
        result += teens[n - 10] + ' ';
        return result.trim();
      }
      result += ones[n];
      return result.trim();
    };

    const parts: string[] = [];
    let scaleIndex = 0;

    while (num > 0 && scaleIndex < scales.length) {
      const part = num % 1000;
      if (part !== 0) {
        const partWords = convertHundred(part);
        parts.unshift(
          partWords + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '')
        );
      }
      num = Math.floor(num / 1000);
      scaleIndex++;
    }

    return parts.join(' ').trim() + ' Only';
  } catch (error) {
    console.log('Error converting number to words:', error);
    return 'Unable to Convert';
  }
};


const BillDetailsScreen: React.FC<BillDetailsScreenProps> = ({ route, navigation }) => {

  const { bill, bills, orgid, studentId, studentData } = route?.params || {};

  const [billDetails, setBillDetails] = useState<BillDetailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [orgList, setOrgList] = useState<any[]>([]);
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);

  const loadInstitutes = async () => {
    try {
      const storedMobile = await AsyncStorage.getItem("mobile")
      console.log(storedMobile, '=========stored mobile')
      const url = `https://www.vtsmile.in/app/api/students/institute_list_api?mobile_no=${storedMobile}`;
      const response = await axios.post(url);

      if (response.status === 200 && response.data?.isSuccess) {
        setOrgList(response.data.orgList || []);
        console.log('Institute list loaded:', response.data.orgList);
      }
    } catch (e) {
      console.error('Error loading institutes:', e);
    }
  };

  // ✅ FIX 2: Validate required params before rendering
  if (!bill || !orgid || !studentId) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-back"
              size={normalize(24)}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bill Details</Text>
          <View style={{ width: normalize(40) }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: Missing required parameters</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }


  const getBillDetail = useCallback(async () => {
    if (!bill || !bill.billNo || !bill.billDate) {
      Alert.alert('Error', 'Invalid bill data');
      navigation.goBack();
      return;
    }

    setIsLoading(true);
    try {
      // Convert date format DD-MM-YYYY to YYYY-MM-DD
      const [day, month, year] = bill.billDate.split('-');
      const formattedDate = `${year}-${month}-${day}`;

      const response = await axios.post(
        `https://www.vtsmile.in/app/api/students/fee_bill_print_api`,
        null,
        {
          params: {
            orgId: bill.orgId,
            billNo: bill.billNo,
            billDate: formattedDate,
          },
          timeout: 10000,
        }
      );

      console.log(response.data.data, '-----------response.data.data');

      if (response?.data?.isSuccess && response?.data?.data) {
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setBillDetails(data);

        // ✅ FIXED: Extract school data from orgList by matching orgId
        if (orgList && orgList.length > 0) {
          const matchedSchool = orgList.find(org => org.orgId === bill.orgId);
          
          if (matchedSchool) {
            setSchoolData({
              orgName: matchedSchool.orgName || '',
              orgArea: matchedSchool.orgArea || '',
              orgCity: matchedSchool.orgCity || '',
              orgLogo: matchedSchool.orgLogo || '',
              orgId: matchedSchool.orgId || '',
            });
            console.log('School data found:', matchedSchool);
          } else {
            console.log('No matching school found for orgId:', bill.orgId);
          }
        } else {
          console.log('orgList is empty or not loaded');
        }
      } else {
        Alert.alert('Error', 'No data found for this bill');
      }
    } catch (error) {
      console.log('Error fetching bill detail:', error);
      Alert.alert('Error', 'Failed to load bill details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [bill, navigation, orgList]);

  // ✅ FIX: Load institutes first on mount
  useEffect(() => {
    loadInstitutes();
  }, []);

  // ✅ FIX 3: Use useEffect to fetch bill data after orgList is loaded
  useEffect(() => {
    if (orgList && orgList.length > 0) {
      getBillDetail();
    }
  }, [getBillDetail, orgList]);
  const generateBillHTML = (billData: BillDetailData[], school: SchoolData | null): string => {
    if (!billData || billData.length === 0) {
      return '<html><body><p>No data available</p></body></html>';
    }

    try {
      const firstRecord = billData[0];

      // Calculate totals
      const totalPaidAmount = billData.reduce(
        (sum, item) => sum + (parseFloat(item.paid_amount) || 0),
        0
      );

      // SIMPLIFIED: Generate fee table with only Fees Particulars and Paid Amount
      const tableRows = billData
        .map((item, index) => {
          const paidAmt = parseFloat(item.paid_amount || '0');

          return `
            <tr>
              <td class="table-cell-left">${item.fee_name || `Fee Item ${index + 1}`}</td>
              <td class="table-cell-right">₹${paidAmt.toFixed(2)}</td>
            </tr>
          `;
        })
        .join('');

      const amountInWords = convertNumberToWords(Math.round(totalPaidAmount));
      const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // ✅ FIXED: Use school data with fallback values
      const schoolLogo = school?.orgLogo || '';
      const schoolName = school?.orgName || 'School Name';
      const schoolArea = school?.orgArea || '';
      const schoolCity = school?.orgCity || '';

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Arial', sans-serif;
              background: white;
              padding: 15px;
              font-size: 13px;
            }
            .container {
              max-width: 900px;
              margin: 0 auto;
              background: white;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #333;
              padding-bottom: 12px;
              margin-bottom: 15px;
            }
            .school-logo {
              text-align: center;
              margin-bottom: 8px;
            }
            .school-logo img {
              max-width: 80px;
              height: auto;
              max-height: 60px;
            }
            .school-name {
              font-size: 22px;
              font-weight: bold;
              color: #000;
              margin-bottom: 3px;
            }
            .school-address {
              font-size: 11px;
              color: #333;
              margin-bottom: 2px;
              line-height: 1.4;
            }
            .receipt-title {
              background: #cccccc;
              padding: 8px;
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              margin: 12px 0;
              border: 2px solid #000;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 15px;
              padding: 0 5px;
            }
            .info-row {
              display: flex;
              margin-bottom: 6px;
              font-size: 12px;
            }
            .info-label {
              font-weight: bold;
              width: 130px;
              color: #000;
              min-width: 130px;
            }
            .info-divider {
              color: #000;
              margin: 0 5px;
              font-weight: bold;
            }
            .info-value {
              flex: 1;
              color: #000;
            }
            .table-container {
              margin: 15px 0;
              border: 2px solid #000;
              overflow: hidden;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            thead tr {
              background: #d9d9d9;
            }
            th {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
              font-weight: bold;
              font-size: 12px;
              color: #000;
            }
            td {
              border: 1px solid #000;
              padding: 7px;
              font-size: 12px;
              color: #000;
            }
            .table-cell-left {
              text-align: left;
              font-weight: 500;
            }
            .table-cell-right {
              text-align: right;
              font-family: 'Courier New', monospace;
              width: 120px;
              font-weight: bold;
            }
            .total-row {
              background: #e8e8e8;
              font-weight: bold;
            }
            .total-row td {
              padding: 10px;
              font-size: 13px;
              font-weight: bold;
            }
            .amount-in-words {
              border: 2px solid #000;
              padding: 12px;
              margin: 15px 0;
              font-size: 13px;
              font-weight: bold;
              color: #000;
              background: #f9f9f9;
            }
            .summary-section {
              margin: 15px 0;
              padding: 12px;
              border: 1px solid #999;
              background: #f5f5f5;
            }
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 7px;
              font-size: 12px;
            }
            .summary-row:last-child {
              margin-bottom: 0;
            }
            .summary-label {
              font-weight: bold;
              color: #000;
            }
            .summary-value {
              color: #000;
              font-family: 'Courier New', monospace;
              font-weight: bold;
              text-align: right;
              flex: 0 0 auto;
              margin-left: 20px;
            }
            .divider-line {
              border-top: 1px solid #999;
              margin: 7px 0;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 11px;
              color: #666;
              border-top: 1px solid #ccc;
              padding-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="school-logo">
                ${schoolLogo ? `<img src="${schoolLogo}" alt="School Logo" />` : ''}
              </div>
              <div class="school-name">${schoolName}</div>
              ${schoolArea ? `<div class="school-address">${schoolArea}</div>` : ''}
              ${schoolCity ? `<div class="school-address">${schoolCity}</div>` : ''}
            </div>

            <div class="receipt-title">FEE RECEIPT</div>

            <div class="info-grid">
              <div>
                <div class="info-row">
                  <span class="info-label">Bill No</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.bill_no || 'N/A'}</span>
                </div>
                ${firstRecord.admission_no ? `
                <div class="info-row">
                  <span class="info-label">Admission No</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.admission_no}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">Name</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.student_name || 'N/A'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Roll No</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.roll_no || 'N/A'}</span>
                </div>
                ${firstRecord.dob ? `
                <div class="info-row">
                  <span class="info-label">Date of Birth</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.dob}</span>
                </div>
                ` : ''}
              </div>
              <div>
                <div class="info-row">
                  <span class="info-label">Bill Date</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.bill_date || 'N/A'}</span>
                </div>
                ${firstRecord.father_name ? `
                <div class="info-row">
                  <span class="info-label">Father Name</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.father_name}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="info-label">Class</span>
                  <span class="info-divider">:</span>
                  <span class="info-value">${firstRecord.std_name || ''} - ${firstRecord.section || ''}</span>
                </div>
              </div>
            </div>

            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th style="flex: 1;">Fees Particulars</th>
                    <th style="width: 120px;">Paid Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                  <tr class="total-row">
                    <td style="text-align: left; font-weight: bold;">Total Paid Amount</td>
                    <td class="table-cell-right">₹${totalPaidAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="amount-in-words">
              Amount (In Words): ${amountInWords}
            </div>

            <div class="summary-section">
              <div class="summary-row">
                <span class="summary-label">Total Paid Amount:</span>
                <span class="summary-value">₹${totalPaidAmount.toFixed(2)}</span>
              </div>
            </div>

            <div class="footer">
              <p>Generated on ${currentDate}</p>
              <p>This is a computer-generated receipt. No signature required.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } catch (error) {
      console.log('Error generating HTML:', error);
      return '<html><body><p>Error generating receipt</p></body></html>';
    }
  };


  /**
   * Download bill receipt as PDF
   */
  const downloadBillReceipt = async (): Promise<void> => {
    if (!bill || !billDetails || billDetails.length === 0) {
      Alert.alert('Error', 'No bill data available to download.');
      return;
    }

    setIsDownloading(true);
    try {
      // ✅ FIXED: Pass schoolData to the HTML generation function
      const htmlContent = generateBillHTML(billDetails, schoolData);

      if (!htmlContent || htmlContent.trim().length === 0) {
        throw new Error('HTML content is empty');
      }

      const fileName = `Bill_${bill.billNo}_${bill.billDate.replace(/\//g, '-')}`;

      const pdf = await generatePDF({
        html: htmlContent,
        fileName: fileName,
        base64: false,
      });

      if (pdf && pdf.filePath) {
        const destinationPath = Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`
          : `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;

        await RNFS.copyFile(pdf.filePath, destinationPath);

        try {
          await Share.open({
            url: Platform.OS === 'android'
              ? `file://${destinationPath}`
              : destinationPath,
            type: 'application/pdf',
            title: 'Share Bill Receipt',
            message: 'Here is your bill receipt',
            failOnCancel: false,
          });
        } catch (shareError) {
          console.log('Share cancelled or error:', shareError);
        }

        Alert.alert(
          'Success',
          Platform.OS === 'android'
            ? `Bill receipt downloaded!\n\nFile: ${fileName}.pdf\n\nLocation: Downloads folder`
            : `Bill receipt generated!\n\nFile: ${fileName}.pdf`,
          [{ text: 'OK', onPress: () => { } }]
        );
      } else {
        Alert.alert('Error', 'Failed to generate PDF file. Please try again.');
      }
    } catch (error) {
      console.log('Error generating PDF:', error);
      Alert.alert(
        'Error',
        `Failed to generate bill receipt.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const BillInfoRow = ({
    label,
    value,
    highlight,
    error,
  }: {
    label: string;
    value: string;
    highlight?: boolean;
    error?: boolean;
  }) => (
    <View style={styles.billInfoRow}>
      <Text style={styles.billInfoLabel}>{label}</Text>
      <Text
        style={[
          styles.billInfoValue,
          highlight && styles.billInfoValueHighlight,
          error && styles.billInfoValueError,
        ]}
      >
        {value}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loaderText}>Loading bill details…</Text>
      </View>
    );
  }

  if (!billDetails || billDetails.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BillsList', {
                bills: bills || [],
                orgid,
                studentId,
                studentData,
              })
            }
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-back"
              size={normalize(24)}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bill Details</Text>
          <View style={{ width: normalize(40) }} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Data</Text>
          <Text style={styles.emptySubtitle}>
            Bill details not available
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BillsList', {
                bills: bills || [],
                orgid,
                studentId,
                studentData,
              })
            }
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-back"
              size={normalize(24)}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bill Details</Text>
          <View style={{ width: normalize(40) }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentCard}>
            {/* Bill Header */}
            <View style={styles.billDetailHeader}>
              <Text style={styles.billDetailTitle}>
                Bill Receipt {billDetails[0]?.bill_no}
              </Text>
              <Text style={styles.billDetailDate}>
                {billDetails[0]?.bill_date}
              </Text>
            </View>

            {/* Student Info */}
            <View style={styles.billSection}>
              <Text style={styles.sectionTitle}>
                Student Information
              </Text>
              <BillInfoRow
                label="Name"
                value={billDetails[0]?.student_name || 'N/A'}
              />
              <BillInfoRow
                label="Roll No"
                value={billDetails[0]?.roll_no || 'N/A'}
              />
              <BillInfoRow
                label="Class"
                value={`${billDetails[0]?.std_name || ''} - ${billDetails[0]?.section || ''}`}
              />
            </View>

            {/* Fee Details */}
            <View style={styles.billSection}>
              <Text style={styles.sectionTitle}>
                Fee Details
              </Text>
              {billDetails.map((item, index) => (
                <View
                  key={`fee-detail-${index}`}
                  style={styles.feeDetailCard}
                >
                  <View style={styles.feeDetailRow}>
                    <Text style={styles.feeDetailLabel}>
                      {item.fee_name}
                    </Text>
                  </View>
                  <BillInfoRow
                    label="Fee Amount"
                    value={`₹ ${parseFloat(item.fee_amount || '0').toFixed(2)}`}
                  />
                  <BillInfoRow
                    label="Paid Amount"
                    value={`₹ ${parseFloat(item.paid_amount || '0').toFixed(2)}`}
                    highlight={parseFloat(item.paid_amount || '0') > 0}
                  />
                  <BillInfoRow
                    label="Pending"
                    value={`₹ ${parseFloat(item.pending_amt || '0').toFixed(2)}`}
                    error={parseFloat(item.pending_amt || '0') > 0}
                  />
                </View>
              ))}
            </View>

            {/* Summary */}
            <View style={styles.billSection}>
              <Text style={styles.sectionTitle}>
                Summary
              </Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    Total Fee Amount:
                  </Text>
                  <Text style={styles.summaryValue}>
                    ₹
                    {billDetails
                      .reduce(
                        (sum, item) =>
                          sum +
                          parseFloat(item.fee_amount || '0'),
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    Total Paid Amount:
                  </Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      { color: COLORS.success, fontWeight: 'bold' },
                    ]}
                  >
                    ₹
                    {billDetails
                      .reduce(
                        (sum, item) =>
                          sum +
                          parseFloat(item.paid_amount || '0'),
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.summaryRow,
                    styles.summaryRowBorder,
                  ]}
                >
                  <Text style={styles.summaryLabel}>
                    Total Pending:
                  </Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      {
                        color:
                          billDetails.reduce(
                            (sum, item) =>
                              sum +
                              parseFloat(item.pending_amt || '0'),
                            0
                          ) > 0
                            ? COLORS.error
                            : COLORS.success,
                      },
                    ]}
                  >
                    ₹
                    {billDetails
                      .reduce(
                        (sum, item) =>
                          sum +
                          parseFloat(item.pending_amt || '0'),
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Download Button */}
            <TouchableOpacity
              style={styles.downloadBtn}
              activeOpacity={0.85}
              onPress={downloadBillReceipt}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <>
                  <MaterialIcons
                    name="download"
                    size={normalize(16)}
                    color="#fff"
                  />
                  <Text style={styles.payBtnText}>
                    Download PDF Receipt
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={{ height: hp(4) }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingBottom: hp(2),
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#F8F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: clamp(normalize(14), 12, 16),
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    marginTop: hp(2),
  },
  header: {
    backgroundColor: COLORS.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: clamp(normalize(18), 15, 20),
    fontFamily: fonts.FONT_BOLD,
    letterSpacing: 0.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  errorText: {
    fontSize: clamp(normalize(16), 14, 18),
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: hp(2),
    fontFamily: fonts.ROBOTO_BOLD,
  },
  retryBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: normalize(12),
  },
  retryBtnText: {
    color: '#fff',
    fontSize: clamp(normalize(14), 12, 16),
    fontFamily: fonts.ROBOTO_BOLD,
  },
  contentCard: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    borderRadius: normalize(20),
    backgroundColor: '#eeeaeaf3',
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    padding: wp(4),
  },
  billDetailHeader: {
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.divider,
    paddingBottom: hp(1.5),
    marginBottom: hp(1.5),
  },
  billDetailTitle: {
    fontSize: clamp(normalize(18), 16, 22),
    fontFamily: fonts.ROBOTO_BOLD,
    color: COLORS.primary,
    marginBottom: hp(0.5),
  },
  billDetailDate: {
    fontSize: clamp(normalize(12), 11, 14),
    color: COLORS.textSecondary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  billSection: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: clamp(normalize(14), 13, 16),
    fontFamily: fonts.ROBOTO_BOLD,
    color: COLORS.primary,
    marginBottom: hp(1),
    paddingHorizontal: wp(3),
  },
  billInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.divider,
  },
  billInfoLabel: {
    fontSize: clamp(normalize(12), 11, 14),
    color: COLORS.textSecondary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  billInfoValue: {
    fontSize: clamp(normalize(12), 11, 14),
    color: COLORS.textPrimary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  billInfoValueHighlight: {
    color: COLORS.success,
    fontWeight: 'bold',
  },
  billInfoValueError: {
    color: COLORS.error,
  },
  feeDetailCard: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: normalize(10),
    padding: wp(3),
    marginBottom: hp(1),
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  feeDetailRow: {
    marginBottom: hp(0.8),
  },
  feeDetailLabel: {
    fontSize: clamp(normalize(13), 12, 15),
    fontFamily: fonts.ROBOTO_BOLD,
    color: COLORS.primary,
  },
  summaryCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: normalize(12),
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    padding: wp(4),
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  summaryRowBorder: {
    borderTopWidth: 1.5,
    borderTopColor: COLORS.divider,
    paddingTop: hp(1.5),
    marginTop: hp(0.5),
  },
  summaryLabel: {
    fontSize: clamp(normalize(12), 11, 14),
    color: COLORS.textSecondary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  summaryValue: {
    fontSize: clamp(normalize(13), 12, 15),
    color: COLORS.textPrimary,
    fontFamily: fonts.ROBOTO_BOLD,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginTop: hp(2),
    borderRadius: normalize(16),
    paddingVertical: hp(1.8),
    gap: wp(2),
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  payBtnText: {
    color: '#fff',
    fontSize: clamp(normalize(15), 13, 17),
    fontFamily: fonts.ROBOTO_BOLD,
    letterSpacing: 0.4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: clamp(normalize(20), 18, 24),
    fontFamily: fonts.ROBOTO_BOLD,
    color: COLORS.textPrimary,
    marginBottom: hp(0.8),
  },
  emptySubtitle: {
    fontSize: clamp(normalize(13), 12, 15),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default BillDetailsScreen;