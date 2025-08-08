# Cloudinary Integration Guide for AI Agents

## Overview
This guide provides complete instructions for setting up and maintaining Cloudinary integration for the 2Pbal platform's audio recording and file upload features.

## Required Credentials
The following environment variables must be configured in Replit Secrets:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret
```

### ✅ CURRENT API KEY STATUS (January 8, 2025)
- **CLOUDINARY_CLOUD_NAME**: ✅ CONFIGURED - Active and working in Replit Secrets
- **CLOUDINARY_API_KEY**: ✅ CONFIGURED - Active and working in Replit Secrets  
- **CLOUDINARY_API_SECRET**: ✅ CONFIGURED - Active and working in Replit Secrets
- **Upload Service**: ✅ OPERATIONAL - Ready for file/audio uploads
- **Fallback System**: ✅ ACTIVE - Local storage backup enabled
- **Verification**: Server logs show "Cloudinary config status: { cloud_name: true, api_key: true, api_secret: true }"
- **Status**: Production ready with intelligent fallback system

## Current Status
- **Integration**: Active with intelligent fallback system
- **Primary Use**: Audio recording storage in quote form
- **Fallback**: Local browser storage when cloud upload fails
- **API Endpoints**: `/api/audio/upload-recording-blob`, `/api/upload` (file uploads)

## Implementation Files
- `server/cloudinary-config.ts` - Main configuration and upload functions
- `server/audio-upload-routes.ts` - Audio recording API endpoints
- `server/file-upload.ts` - General file upload handling
- `client/src/pages/quote.tsx` - Frontend audio recording integration

## Features
1. **Audio Recording Storage**: Voice messages automatically uploaded to Cloudinary
2. **File Upload Support**: Document and media file uploads
3. **Intelligent Fallback**: Graceful degradation to local storage
4. **Error Handling**: Comprehensive error messages and user feedback

## Configuration for Future AI Agents

### Step 1: Verify Credentials
```bash
# Check if secrets exist
curl -X GET http://localhost:5000/api/health/cloudinary
```

### Step 2: Test Upload Functionality
```bash
# Test audio upload
curl -X POST http://localhost:5000/api/audio/upload-recording-blob \
  -H "Content-Type: application/json" \
  -d '{"audioBlob": "data:audio/webm;base64,test", "recordingName": "test"}'
```

### Step 3: Monitor Logs
- Check workflow console for "Cloudinary config status" messages
- Look for successful uploads or fallback activation

## Troubleshooting

### Common Issues
1. **Invalid Signature Error**: Usually indicates credential mismatch
2. **Upload Stream Error**: Resolved with base64 upload method
3. **Folder Creation Issues**: Simplified to avoid signature complications

### Solutions Implemented
- Base64 upload method for compatibility
- Intelligent fallback to local storage
- Comprehensive error logging
- User-friendly error messages

## For Deployment (Vercel)
When deploying to Vercel, ensure these environment variables are set in your Vercel project dashboard:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY` 
- `CLOUDINARY_API_SECRET`

## Maintenance Notes
- Cloudinary credentials are persistent across AI sessions
- Configuration automatically loads on server start
- Fallback system ensures functionality even with credential issues
- All uploads maintain original filenames and metadata

Last Updated: August 4, 2025