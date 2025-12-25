// 全局变量
let currentZoom = 100; // 当前缩放级别（百分比）
let guidesVisible = true; // 辅助线是否显示
let selectedElement = null; // 当前选中的元素
let uploadedMaterials = []; // 已上传的素材数组
let textElements = []; // 文字元素数组
let shapeElements = []; // 形状元素数组
let moduleElements = []; // 模块元素数组
let weatherIconElements = []; // 天气图标元素数组
let temperatureElements = []; // 温度文本元素数组  
let materialCounter = 0; // 素材计数器
let textCounter = 0; // 文字计数器
let shapeCounter = 0; // 形状计数器
let moduleCounter = 0; // 模块计数器
let currentBackgroundImage = null; // 当前背景图片
let currentGradient = null; // 当前渐变背景
let currentGradientType = 'linear'; // 当前渐变类型
let gradientStops = []; // 渐变颜色停止点
let currentGuideColor = 'rgba(136, 136, 136, 0.4)'; // 当前辅助线颜色
let configExportScale = 1.0; // 配置预览缩放比例
let configExportFormat = 'png'; // 配置预览格式
let copiedElementData = null; // 复制的元素数据
let copiedElementType = null; // 复制的元素类型
let copyOffset = 10; // 粘贴时的偏移量（像素）
// 计数器
let weatherIconCounter = 0;
let temperatureCounter = 0;
// 导出图片设置
let exportScale = 1.0; // 当前导出缩放比例
let exportFormat = 'png'; // 当前导出格式
// 指针时钟数组
let analogClockElements = [];
let analogClockCounter = 0;

// Widget数据格式
let widgetData = {
    name: "custom_widget",
    version: 1,
    layer: [
        {
            type: "custom_widget",
            position: {
                x: 0,
                y: 0,
                width: 60,
                height: 30
            },
            views: []
        }
    ],
    span_x: 4,
    span_y: 2,
    "可配置模板": ""
};

// 当前选中的素材数据
let currentMaterialData = {
    id: null,
    name: "未选择",
    enabled: true,
    width: 5,
    height: 5,
    x: 15,
    y: 15,
    rotation: 0,
    opacity: 100,
    zIndex: 10
};

// 当前选中的文字数据
let currentTextData = {
    id: null,
    name: "未选择",
    content: "示例文字",
    enabled: true,
    width: 8,
    height: 4,
    size: 3,
    color: "#000000",
    font: "'Noto Sans SC', sans-serif",
    hAlign: "center",
    vAlign: "center",
    x: 15,
    y: 15,
    rotation: 0,
    opacity: 100,
    zIndex: 10
};

// 当前选中的形状数据
let currentShapeData = {
    id: null,
    name: "未选择",
    type: "未选择",
    enabled: true,
    width: 5,
    height: 5,
    color: "#6a89cc",
    x: 15,
    y: 15,
    rotation: 0,
    opacity: 100,
    zIndex: 10,
    gradient: null, // 渐变背景
    gradientType: 'linear', // 渐变类型
    gradientStops: [] // 渐变停止点
};

// 当前选中的模块数据
let currentModuleData = {
    id: null,
    name: "未选择",
    type: "未选择",
    enabled: true,
    width: 12,
    height: 5,
    x: 15,
    y: 15,
    textSize: 3,
    textColor: "#000000",
    dateFormat: "MM/dd", // 日期格式
    hAlign: "center",
    vAlign: "center",
    zIndex: 10
};

// 当前选中的天气图标数据
let currentWeatherIconData = {
    id: null,
    name: "未选择",
    type: "weather-icon",
    enabled: true,
    width: 5,
    height: 5,
    x: 15,
    y: 15,
    rotation: 0,
    opacity: 100,
    zIndex: 10,
    imageUrl: './resources/weather.png' // 默认图片路径
};

// 当前选中的温度文本数据
let currentTemperatureData = {
    id: null,
    name: "未选择",
    type: "temperature",
    enabled: true,
    width: 8,
    height: 4,
    x: 20, // 默认在图标右侧
    y: 15,
    textSize: 3,
    textColor: "#000000",
    content: "N/A",
    zIndex: 10
};

// 当前选中的指针时钟数据
let currentAnalogClockData = {
    id: null,
    name: "未选择",
    type: "analog-clock",
    enabled: true,
    width: 25,
    height: 25,
    x: 2,
    y: 2,
    zIndex: 10,
    element: null,
    dialImage: './resources/clock_dial.png',
    hourImage: './resources/clock_hour.png',
    minuteImage: './resources/clock_minute.png',
    secondImage: './resources/clock_second.png',
    dialDataUrl: null,
    hourDataUrl: null,
    minuteDataUrl: null,
    secondDataUrl: null
};

// 指针时钟的默认图片路径（用于重置）
const defaultClockImages = {
    dial: './resources/clock_dial.png',
    hour: './resources/clock_hour.png',
    minute: './resources/clock_minute.png',
    second: './resources/clock_second.png'
};

// DOM元素
const widgetContainer = document.getElementById('widgetContainer');
const widgetContent = document.getElementById('widgetContent');
const uploadedMaterialsList = document.getElementById('uploadedMaterialsList');
const uploadedMaterialsHeader = document.getElementById('uploadedMaterialsHeader');
const uploadedMaterialsContainer = document.getElementById('uploadedMaterialsContainer');
const textMaterialsList = document.getElementById('textMaterialsList');
const textMaterialsHeader = document.getElementById('textMaterialsHeader');
const textMaterialsContainer = document.getElementById('textMaterialsContainer');
const shapeMaterialsList = document.getElementById('shapeMaterialsList');
const shapeMaterialsHeader = document.getElementById('shapeMaterialsHeader');
const shapeMaterialsContainer = document.getElementById('shapeMaterialsContainer');
const moduleMaterialsList = document.getElementById('moduleMaterialsList');
const moduleMaterialsHeader = document.getElementById('moduleMaterialsHeader');
const moduleMaterialsContainer = document.getElementById('moduleMaterialsContainer');
const exportModal = document.getElementById('exportModal');
const jsonOutput = document.getElementById('jsonOutput');
const guideLines = document.getElementById('guideLines');
const zoomLevel = document.getElementById('zoomLevel');
const guideStatus = document.getElementById('guideStatus');
const previewCanvas = document.getElementById('previewCanvas');
const exportPreview = document.getElementById('exportPreview');
const gradientStopsContainer = document.getElementById('gradientStopsContainer');
const gradientPreview = document.getElementById('gradientPreview');


// 初始化函数
function init() {
    // 初始化右键菜单
    initContextMenu();

    // 设置默认背景
    widgetContainer.style.backgroundColor = '#ffffff';
    widgetContainer.style.background = '#ffffff';
    document.getElementById('widgetBgColor').value = '#ffffff';
    document.querySelector('.color-option[data-color="#ffffff"]').classList.add('selected');

    // 初始化渐变编辑器
    initGradientEditor();
    initShapeGradientEditor();

    // 初始化事件监听器
    setupEventListeners();

    // 初始化拖拽功能
    initDragAndDrop();

    // 初始化辅助线
    updateGuideLines();

    // 确保辅助线默认显示
    guidesVisible = true;
    guideStatus.textContent = "显示";
    guideLines.style.display = 'block';

    // 更新缩放显示
    updateZoomDisplay();

    // 设置天气图标和温度面板事件监听器
    setupWeatherIconEventListeners();
    setupTemperatureEventListeners();

    // 设置指针时钟事件监听器
    setupAnalogClockEventListeners();

    // 设置时钟图片上传
    setupClockImageUpload('uploadClockDial', 'analogClockDialImg', 'dial');
    setupClockImageUpload('uploadClockHour', 'analogClockHourImg', 'hour');
    setupClockImageUpload('uploadClockMinute', 'analogClockMinuteImg', 'minute');
    setupClockImageUpload('uploadClockSecond', 'analogClockSecondImg', 'second');

    // 重置时钟图片按钮
    document.getElementById('resetClockImagesBtn').addEventListener('click', resetClockImages);

    loadDefaultClockImages();

    // 更新widgetData中的views
    updateWidgetDataViews();

    // 添加背景上传容器点击事件
    const backgroundUploadContainer = document.getElementById('backgroundUploadContainer');
    const uploadBackgroundInput = document.getElementById('uploadBackground');

    if (backgroundUploadContainer && uploadBackgroundInput) {
        // 确保点击按钮触发文件选择
        backgroundUploadContainer.addEventListener('click', function (e) {
            // 防止事件冒泡
            e.stopPropagation();
            uploadBackgroundInput.click();
        });

        // 监听文件选择变化
        uploadBackgroundInput.addEventListener('change', function (e) {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                    // 清除其他背景设置
                    currentGradient = null;

                    // 设置背景图片
                    currentBackgroundImage = e.target.result;
                    widgetContainer.style.backgroundImage = `url(${currentBackgroundImage})`;
                    widgetContainer.style.background = `url(${currentBackgroundImage})`;
                    widgetContainer.style.backgroundColor = 'transparent';
                    widgetContainer.style.backgroundSize = 'cover';
                    widgetContainer.style.backgroundPosition = 'center';
                    widgetContainer.style.backgroundRepeat = 'no-repeat';

                    // 重置颜色选择器
                    const bgColorInput = document.getElementById('widgetBgColor');
                    const colorPreview = document.querySelector('.color-option.selected');
                    if (colorPreview) {
                        colorPreview.classList.remove('selected');
                    }
                    if (bgColorInput) {
                        bgColorInput.value = '#ffffff';
                    }

                    updateWidgetDataViews();
                };

                reader.readAsDataURL(file);
                // 重置input以便再次选择相同文件
                this.value = '';
            }
        });
    }

    // 初始选中widget
    selectWidget();
}

// 加载默认时钟图片并转换为base64
async function loadDefaultClockImages() {
    const imageNames = ['dial', 'hour', 'minute', 'second'];

    for (const name of imageNames) {
        try {
            const response = await fetch(defaultClockImages[name]);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onload = function (e) {
                defaultClockImages[name] = e.target.result;
            };

            reader.readAsDataURL(blob);
        } catch (error) {
            console.error(`加载默认${name}图片失败:`, error);
        }
    }
}

// 设置指针时钟事件监听器
function setupAnalogClockEventListeners() {
    // 宽度输入
    const widthInput = document.getElementById('analogClockWidth');
    if (widthInput) {
        widthInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'analog-clock') {
                const gridWidth = parseInt(this.value) || 1;
                const validWidth = Math.max(1, Math.min(30, gridWidth));
                applyElementSize(selectedElement, validWidth, currentAnalogClockData.height, 'analog-clock');
                currentAnalogClockData.width = validWidth;

                const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
                if (clockData) {
                    clockData.width = validWidth;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 高度输入
    const heightInput = document.getElementById('analogClockHeight');
    if (heightInput) {
        heightInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'analog-clock') {
                const gridHeight = parseInt(this.value) || 1;
                const validHeight = Math.max(1, Math.min(30, gridHeight));
                applyElementSize(selectedElement, currentAnalogClockData.width, validHeight, 'analog-clock');
                currentAnalogClockData.height = validHeight;

                const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
                if (clockData) {
                    clockData.height = validHeight;
                }

                updateWidgetDataViews();
            }
        });
    }

    // X位置输入
    const xInput = document.getElementById('analogClockX');
    if (xInput) {
        xInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'analog-clock') {
                const x = parseInt(this.value) || 0;
                const gridSize = getGridSize();
                const validX = Math.max(0, Math.min(gridSize.x, x));
                applyElementPosition(selectedElement, validX, currentAnalogClockData.y);
                currentAnalogClockData.x = validX;

                const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
                if (clockData) {
                    clockData.x = validX;
                }

                updateWidgetDataViews();
            }
        });
    }

    // Y位置输入
    const yInput = document.getElementById('analogClockY');
    if (yInput) {
        yInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'analog-clock') {
                const y = parseInt(this.value) || 0;
                const gridSize = getGridSize();
                const validY = Math.max(0, Math.min(gridSize.y, y));
                applyElementPosition(selectedElement, currentAnalogClockData.x, validY);
                currentAnalogClockData.y = validY;

                const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
                if (clockData) {
                    clockData.y = validY;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 时钟图片预览区域点击事件
    setupClockImagePreviewClick('analogClockDialPreview', 'uploadClockDial');
    setupClockImagePreviewClick('analogClockHourPreview', 'uploadClockHour');
    setupClockImagePreviewClick('analogClockMinutePreview', 'uploadClockMinute');
    setupClockImagePreviewClick('analogClockSecondPreview', 'uploadClockSecond');

    // 置前按钮
    const bringForwardBtn = document.getElementById('analogClockBringForwardBtn');
    if (bringForwardBtn) {
        bringForwardBtn.addEventListener('click', function () {
            if (selectedElement && selectedElement.dataset.type === 'analog-clock') {
                const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
                selectedElement.style.zIndex = currentZIndex + 1;
                currentAnalogClockData.zIndex = currentZIndex + 1;

                const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
                if (clockData) {
                    clockData.zIndex = currentZIndex + 1;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 置后按钮
    const sendBackwardBtn = document.getElementById('analogClockSendBackwardBtn');
    if (sendBackwardBtn) {
        sendBackwardBtn.addEventListener('click', function () {
            if (selectedElement && selectedElement.dataset.type === 'analog-clock') {
                const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
                if (currentZIndex > 1) {
                    selectedElement.style.zIndex = currentZIndex - 1;
                    currentAnalogClockData.zIndex = currentZIndex - 1;

                    const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
                    if (clockData) {
                        clockData.zIndex = currentZIndex - 1;
                    }

                    updateWidgetDataViews();
                }
            }
        });
    }
}

// 设置时钟图片预览区域点击事件
function setupClockImagePreviewClick(previewId, inputId) {
    const preview = document.getElementById(previewId);
    const input = document.getElementById(inputId);

    if (preview && input) {
        preview.addEventListener('click', function (e) {
            e.stopPropagation();
            input.click();
        });

        // 防止点击图片本身也触发
        const img = preview.querySelector('img');
        if (img) {
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                input.click();
            });
        }
    }
}

// 设置天气图标事件监听器
function setupWeatherIconEventListeners() {
    // 宽度输入
    const widthInput = document.getElementById('weatherIconWidth');
    if (widthInput) {
        widthInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'weather-icon') {
                const gridWidth = parseInt(this.value) || 1;
                const validWidth = Math.max(1, Math.min(30, gridWidth));
                applyElementSize(selectedElement, validWidth, currentWeatherIconData.height, 'weather-icon');
                currentWeatherIconData.width = validWidth;

                const weatherIconData = weatherIconElements.find(w => w.id === currentWeatherIconData.id);
                if (weatherIconData) {
                    weatherIconData.width = validWidth;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 高度输入
    const heightInput = document.getElementById('weatherIconHeight');
    if (heightInput) {
        heightInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'weather-icon') {
                const gridHeight = parseInt(this.value) || 1;
                const validHeight = Math.max(1, Math.min(30, gridHeight));
                applyElementSize(selectedElement, currentWeatherIconData.width, validHeight, 'weather-icon');
                currentWeatherIconData.height = validHeight;

                const weatherIconData = weatherIconElements.find(w => w.id === currentWeatherIconData.id);
                if (weatherIconData) {
                    weatherIconData.height = validHeight;
                }

                updateWidgetDataViews();
            }
        });
    }

    // X位置输入
    const xInput = document.getElementById('weatherIconX');
    if (xInput) {
        xInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'weather-icon') {
                const x = parseInt(this.value) || 0;
                const gridSize = getGridSize();
                const validX = Math.max(0, Math.min(gridSize.x, x));
                applyElementPosition(selectedElement, validX, currentWeatherIconData.y);
                currentWeatherIconData.x = validX;

                const weatherIconData = weatherIconElements.find(w => w.id === currentWeatherIconData.id);
                if (weatherIconData) {
                    weatherIconData.x = validX;
                }

                updateWidgetDataViews();
            }
        });
    }

    // Y位置输入
    const yInput = document.getElementById('weatherIconY');
    if (yInput) {
        yInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'weather-icon') {
                const y = parseInt(this.value) || 0;
                const gridSize = getGridSize();
                const validY = Math.max(0, Math.min(gridSize.y, y));
                applyElementPosition(selectedElement, currentWeatherIconData.x, validY);
                currentWeatherIconData.y = validY;

                const weatherIconData = weatherIconElements.find(w => w.id === currentWeatherIconData.id);
                if (weatherIconData) {
                    weatherIconData.y = validY;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 置前按钮
    const bringForwardBtn = document.getElementById('weatherIconBringForwardBtn');
    if (bringForwardBtn) {
        bringForwardBtn.addEventListener('click', function () {
            if (selectedElement && selectedElement.dataset.type === 'weather-icon') {
                const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
                selectedElement.style.zIndex = currentZIndex + 1;
                currentWeatherIconData.zIndex = currentZIndex + 1;

                const weatherIconData = weatherIconElements.find(w => w.id === currentWeatherIconData.id);
                if (weatherIconData) {
                    weatherIconData.zIndex = currentZIndex + 1;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 置后按钮
    const sendBackwardBtn = document.getElementById('weatherIconSendBackwardBtn');
    if (sendBackwardBtn) {
        sendBackwardBtn.addEventListener('click', function () {
            if (selectedElement && selectedElement.dataset.type === 'weather-icon') {
                const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
                if (currentZIndex > 1) {
                    selectedElement.style.zIndex = currentZIndex - 1;
                    currentWeatherIconData.zIndex = currentZIndex - 1;

                    const weatherIconData = weatherIconElements.find(w => w.id === currentWeatherIconData.id);
                    if (weatherIconData) {
                        weatherIconData.zIndex = currentZIndex - 1;
                    }

                    updateWidgetDataViews();
                }
            }
        });
    }
}

// 设置温度事件监听器
function setupTemperatureEventListeners() {
    // 宽度输入
    const widthInput = document.getElementById('temperatureWidth');
    if (widthInput) {
        widthInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const gridWidth = parseInt(this.value) || 1;
                const validWidth = Math.max(1, Math.min(30, gridWidth));
                applyElementSize(selectedElement, validWidth, currentTemperatureData.height, 'temperature');
                currentTemperatureData.width = validWidth;

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.width = validWidth;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 高度输入
    const heightInput = document.getElementById('temperatureHeight');
    if (heightInput) {
        heightInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const gridHeight = parseInt(this.value) || 1;
                const validHeight = Math.max(1, Math.min(30, gridHeight));
                applyElementSize(selectedElement, currentTemperatureData.width, validHeight, 'temperature');
                currentTemperatureData.height = validHeight;

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.height = validHeight;
                }

                updateWidgetDataViews();
            }
        });
    }

    // X位置输入
    const xInput = document.getElementById('temperatureX');
    if (xInput) {
        xInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const x = parseInt(this.value) || 0;
                const gridSize = getGridSize();
                const validX = Math.max(0, Math.min(gridSize.x, x));
                applyElementPosition(selectedElement, validX, currentTemperatureData.y);
                currentTemperatureData.x = validX;

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.x = validX;
                }

                updateWidgetDataViews();
            }
        });
    }

    // Y位置输入
    const yInput = document.getElementById('temperatureY');
    if (yInput) {
        yInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const y = parseInt(this.value) || 0;
                const gridSize = getGridSize();
                const validY = Math.max(0, Math.min(gridSize.y, y));
                applyElementPosition(selectedElement, currentTemperatureData.x, validY);
                currentTemperatureData.y = validY;

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.y = validY;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 文字大小输入
    const sizeInput = document.getElementById('temperatureTextSize');
    if (sizeInput) {
        sizeInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const textSize = parseFloat(this.value);
                if (isNaN(textSize) || textSize <= 0) {
                    this.value = currentTemperatureData.textSize;
                    return;
                }
                const validSize = Math.min(Math.max(0.5, textSize), 30);
                currentTemperatureData.textSize = validSize;

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.textSize = validSize;
                    applyTemperatureStyle(temperatureData.element, temperatureData);
                }

                this.value = validSize;
                updateWidgetDataViews();
            }
        });
    }

    // 文字颜色输入
    const colorInput = document.getElementById('temperatureTextColor');
    if (colorInput) {
        colorInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const textColor = this.value;
                currentTemperatureData.textColor = textColor;

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.textColor = textColor;
                    applyTemperatureStyle(temperatureData.element, temperatureData);
                }

                updateWidgetDataViews();
            }
        });
    }

    // 内容输入
    const contentInput = document.getElementById('temperatureContent');
    if (contentInput) {
        contentInput.addEventListener('input', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const content = this.value;
                const contentSpan = selectedElement.querySelector('.temperature-content');
                if (contentSpan) {
                    contentSpan.textContent = content;
                }

                currentTemperatureData.content = content;
                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.content = content;

                    // 更新温度列表中的预览
                    const temperatureItem = document.querySelector(`.temperature-material[data-id="${temperatureData.id}"] .temperature-content`);
                    if (temperatureItem) {
                        temperatureItem.textContent = content.length > 20 ?
                            content.substring(0, 18) + '...' : content;
                    }
                }

                updateWidgetDataViews();
            }
        });
    }

    // 对齐按钮
    document.querySelectorAll('#temperaturePanel .alignment-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const align = this.dataset.align;
                const value = this.dataset.value;

                // 更新按钮状态
                updateAlignmentButtons('temperature',
                    align === 'horizontal' ? value : currentTemperatureData.hAlign,
                    align === 'vertical' ? value : currentTemperatureData.vAlign
                );

                if (align === 'horizontal') {
                    currentTemperatureData.hAlign = value;
                } else {
                    currentTemperatureData.vAlign = value;
                }

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    if (align === 'horizontal') {
                        temperatureData.hAlign = value;
                    } else {
                        temperatureData.vAlign = value;
                    }
                    applyTemperatureStyle(temperatureData.element, temperatureData);
                }

                updateWidgetDataViews();
            }
        });
    });

    // 置前按钮
    const bringForwardBtn = document.getElementById('temperatureBringForwardBtn');
    if (bringForwardBtn) {
        bringForwardBtn.addEventListener('click', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
                selectedElement.style.zIndex = currentZIndex + 1;
                currentTemperatureData.zIndex = currentZIndex + 1;

                const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                if (temperatureData) {
                    temperatureData.zIndex = currentZIndex + 1;
                }

                updateWidgetDataViews();
            }
        });
    }

    // 置后按钮
    const sendBackwardBtn = document.getElementById('temperatureSendBackwardBtn');
    if (sendBackwardBtn) {
        sendBackwardBtn.addEventListener('click', function () {
            if (selectedElement && selectedElement.dataset.type === 'temperature') {
                const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
                if (currentZIndex > 1) {
                    selectedElement.style.zIndex = currentZIndex - 1;
                    currentTemperatureData.zIndex = currentZIndex - 1;

                    const temperatureData = temperatureElements.find(t => t.id === currentTemperatureData.id);
                    if (temperatureData) {
                        temperatureData.zIndex = currentZIndex - 1;
                    }

                    updateWidgetDataViews();
                }
            }
        });
    }
}

// 初始化右键菜单
function initContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    // 为所有可编辑元素添加右键菜单
    document.addEventListener('contextmenu', function (e) {
        // 检查点击的是否是可编辑元素
        const target = e.target;
        const isElement = target.closest('.draggable-element, .text-element, .shape-element, .module-element, #widgetContainer');

        if (isElement) {
            e.preventDefault();

            // 如果是widget容器，但点击的不是widget内容，不显示菜单
            if (target.id === 'widgetContainer' && !target.classList.contains('selected')) {
                return;
            }

            // 显示右键菜单
            contextMenu.style.display = 'block';
            contextMenu.style.left = e.pageX + 'px';
            contextMenu.style.top = e.pageY + 'px';

            // 如果当前没有选中任何元素，选中点击的元素
            if (isElement !== selectedElement) {
                if (isElement.classList.contains('draggable-element')) {
                    selectMaterialElement(isElement.id);
                } else if (isElement.classList.contains('text-element')) {
                    if (isElement.classList.contains('module-element')) {
                        selectModuleElement(isElement.id);
                    } else {
                        selectTextElement(isElement.id);
                    }
                } else if (isElement.classList.contains('shape-element')) {
                    selectShapeElement(isElement.id);
                } else if (isElement.classList.contains('weather-icon-element')) {
                    selectWeatherIconElement(isElement.id);
                } else if (isElement.classList.contains('temperature-element')) {
                    selectTemperatureElement(isElement.id);
                } else if (isElement.id === 'widgetContainer') {
                    selectWidget();
                } else if (isElement.classList.contains('analog-clock-element')) {
                    selectAnalogClockElement(isElement.id);
                }
            }

            // 更新粘贴按钮状态
            const pasteBtn = document.getElementById('pasteElement');
            pasteBtn.style.opacity = copiedElementData ? '1' : '0.5';
            pasteBtn.style.pointerEvents = copiedElementData ? 'auto' : 'none';
        }
    });

    // 点击其他地方隐藏右键菜单
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.context-menu')) {
            contextMenu.style.display = 'none';
        }
    });

    // 复制菜单项
    document.getElementById('copyElement').addEventListener('click', function () {
        copySelectedElement();
        contextMenu.style.display = 'none';
    });

    // 粘贴菜单项
    document.getElementById('pasteElement').addEventListener('click', function () {
        pasteElement();
        contextMenu.style.display = 'none';
    });

    // 删除菜单项
    document.getElementById('deleteElement').addEventListener('click', function () {
        deleteSelectedElement();
        contextMenu.style.display = 'none';
    });

    // 添加快捷键支持
    document.addEventListener('keydown', function (e) {
        // Ctrl+C 复制
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            copySelectedElement();
        }

        // Ctrl+V 粘贴
        if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            pasteElement();
        }

        // Delete 键删除
        if (e.key === 'Delete') {
            e.preventDefault();
            deleteSelectedElement();
        }
    });
}

// 复制选中的元素
function copySelectedElement() {
    if (!selectedElement) {
        console.warn('没有选中任何元素');
        return;
    }

    const elementType = selectedElement.dataset.type;

    switch (elementType) {
        case 'material':
            copyMaterialElement();
            break;
        case 'text':
            copyTextElement();
            break;
        case 'shape':
            copyShapeElement();
            break;
        case 'module':
            copyModuleElement();
            break;
        case 'analog-clock':
            copyAnalogClockElement();
            break;
        case 'weather-icon':
            copyWeatherIconElement();
            break;
        case 'temperature':
            copyTemperatureElement();
            break;
        default:
            console.warn('不支持复制该类型元素:', elementType);
    }
}

// 复制素材元素
function copyMaterialElement() {
    const material = uploadedMaterials.find(m => m.id === selectedElement.id);
    if (!material) return;

    copiedElementType = 'material';
    copiedElementData = {
        name: material.name + ' - 副本',
        dataUrl: material.dataUrl,
        // 修改这里：从元素的dataset获取最新的网格尺寸
        gridWidth: parseInt(selectedElement.dataset.gridWidth) || material.gridWidth,
        gridHeight: parseInt(selectedElement.dataset.gridHeight) || material.gridHeight,
        x: parseInt(selectedElement.dataset.x) || 0,
        y: parseInt(selectedElement.dataset.y) || 0,
        rotation: parseInt(selectedElement.style.transform?.match(/rotate\(([^)]+)deg\)/)?.[1] || 0),
        opacity: parseFloat(selectedElement.style.opacity || 1) * 100,
        enabled: selectedElement.style.display !== 'none',
        zIndex: parseInt(selectedElement.style.zIndex || 10)
    };
}

// 复制文字元素
function copyTextElement() {
    const textData = textElements.find(t => t.id === selectedElement.id);
    if (!textData) return;

    copiedElementType = 'text';
    copiedElementData = {
        name: textData.name + ' - 副本',
        content: textData.content,
        width: textData.width,
        height: textData.height,
        size: textData.size,
        color: textData.color,
        font: textData.font,
        x: textData.x,
        y: textData.y,
        rotation: textData.rotation,
        opacity: textData.opacity,
        enabled: textData.enabled,
        zIndex: textData.zIndex
    };
}

// 复制形状元素
function copyShapeElement() {
    const shapeData = shapeElements.find(s => s.id === selectedElement.id);
    if (!shapeData) return;

    copiedElementType = 'shape';
    copiedElementData = {
        name: shapeData.name + ' - 副本',
        type: shapeData.type,
        width: shapeData.width,
        height: shapeData.height,
        color: shapeData.color,
        x: shapeData.x,
        y: shapeData.y,
        rotation: shapeData.rotation,
        opacity: shapeData.opacity,
        enabled: shapeData.enabled,
        zIndex: shapeData.zIndex,
        gradient: shapeData.gradient,
        gradientType: shapeData.gradientType,
        gradientStops: shapeData.gradientStops ? [...shapeData.gradientStops] : null
    };
}

// 复制模块元素
function copyModuleElement() {
    const moduleData = moduleElements.find(m => m.id === selectedElement.id);
    if (!moduleData) return;

    copiedElementType = 'module';
    copiedElementData = {
        name: moduleData.name + ' - 副本',
        type: moduleData.type,
        content: moduleData.content,
        width: moduleData.width,
        height: moduleData.height,
        x: moduleData.x,
        y: moduleData.y,
        textSize: moduleData.textSize,
        textColor: moduleData.textColor,
        dateFormat: moduleData.dateFormat,
        enabled: moduleData.enabled,
        zIndex: moduleData.zIndex
    };
}

// 复制指针时钟元素
function copyAnalogClockElement() {
    const clockData = analogClockElements.find(c => c.id === selectedElement.id);
    if (!clockData) return;

    copiedElementType = 'analog-clock';
    copiedElementData = {
        name: clockData.name + ' - 副本',
        width: clockData.width,
        height: clockData.height,
        x: clockData.x,
        y: clockData.y,
        enabled: clockData.enabled,
        zIndex: clockData.zIndex,
        dialImage: clockData.dialImage,
        hourImage: clockData.hourImage,
        minuteImage: clockData.minuteImage,
        secondImage: clockData.secondImage,
        dialDataUrl: clockData.dialDataUrl,
        hourDataUrl: clockData.hourDataUrl,
        minuteDataUrl: clockData.minuteDataUrl,
        secondDataUrl: clockData.secondDataUrl
    };
}

// 粘贴元素
function pasteElement() {
    if (!copiedElementData || !copiedElementType) {
        console.warn('没有可粘贴的元素');
        return;
    }

    // 计算偏移后的位置
    const gridSize = getGridSize();

    // 直接使用格子偏移（1-2个格子）
    const gridOffsetX = 2;
    const gridOffsetY = 2;

    // 创建偏移后的位置
    const offsetX = copiedElementData.x + gridOffsetX;
    const offsetY = copiedElementData.y + gridOffsetY;

    // 确保位置在widget范围内
    const maxX = gridSize.x - (copiedElementData.gridWidth || copiedElementData.width || 5);
    const maxY = gridSize.y - (copiedElementData.gridHeight || copiedElementData.height || 5);
    const safeX = Math.max(0, Math.min(offsetX, maxX));
    const safeY = Math.max(0, Math.min(offsetY, maxY));

    switch (copiedElementType) {
        case 'material':
            pasteMaterialElement(safeX, safeY);
            break;
        case 'text':
            pasteTextElement(safeX, safeY);
            break;
        case 'shape':
            pasteShapeElement(safeX, safeY);
            break;
        case 'module':
            pasteModuleElement(safeX, safeY);
            break;
        case 'analog-clock':
            pasteAnalogClockElement(safeX, safeY);
            break;
    }
}

// 粘贴素材元素
function pasteMaterialElement(x, y) {
    // 创建一个新的File对象（模拟）
    const byteString = atob(copiedElementData.dataUrl.split(',')[1]);
    const mimeString = copiedElementData.dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], copiedElementData.name, { type: mimeString });

    // 处理上传
    handleMaterialUpload(file).then(materialData => {
        // 设置位置和属性
        materialData.name = copiedElementData.name;
        materialData.gridWidth = copiedElementData.gridWidth;
        materialData.gridHeight = copiedElementData.gridHeight;
        materialData.enabled = copiedElementData.enabled;

        // 更新元素
        if (materialData.element) {
            applyElementPosition(materialData.element, x, y);
            applyElementSize(materialData.element, copiedElementData.gridWidth, copiedElementData.gridHeight, 'material');
            materialData.element.style.transform = `rotate(${copiedElementData.rotation}deg)`;
            materialData.element.style.opacity = copiedElementData.opacity / 100;
            materialData.element.style.zIndex = copiedElementData.zIndex;
            materialData.element.style.display = copiedElementData.enabled ? 'flex' : 'none';

            // 选中新创建的元素
            selectMaterialElement(materialData.id);
        }

        // 更新数据
        materialData.x = x;
        materialData.y = y;
        materialData.rotation = copiedElementData.rotation;
        materialData.opacity = copiedElementData.opacity;
        materialData.zIndex = copiedElementData.zIndex;

        updateWidgetDataViews();
    });
}

// 粘贴文字元素
function pasteTextElement(x, y) {
    const textData = addTextElement();

    // 设置属性
    textData.name = copiedElementData.name;
    textData.content = copiedElementData.content;
    textData.width = copiedElementData.width;
    textData.height = copiedElementData.height;
    textData.size = copiedElementData.size;
    textData.color = copiedElementData.color;
    textData.font = copiedElementData.font;
    textData.x = x;
    textData.y = y;
    textData.rotation = copiedElementData.rotation;
    textData.opacity = copiedElementData.opacity;
    textData.enabled = copiedElementData.enabled;
    textData.zIndex = copiedElementData.zIndex;

    // 更新元素
    if (textData.element) {
        applyElementPosition(textData.element, x, y);
        applyElementSize(textData.element, copiedElementData.width, copiedElementData.height, 'text');
        applyTextStyle(textData.element, textData);

        // 选中新创建的元素
        selectTextElement(textData.id);
    }

    updateWidgetDataViews();
}

// 粘贴形状元素
function pasteShapeElement(x, y) {
    const shapeData = addShapeElement(copiedElementData.type);

    // 设置属性
    shapeData.name = copiedElementData.name;
    shapeData.width = copiedElementData.width;
    shapeData.height = copiedElementData.height;
    shapeData.color = copiedElementData.color;
    shapeData.x = x;
    shapeData.y = y;
    shapeData.rotation = copiedElementData.rotation;
    shapeData.opacity = copiedElementData.opacity;
    shapeData.enabled = copiedElementData.enabled;
    shapeData.zIndex = copiedElementData.zIndex;
    shapeData.gradient = copiedElementData.gradient;
    shapeData.gradientType = copiedElementData.gradientType;
    shapeData.gradientStops = copiedElementData.gradientStops;

    // 更新元素
    if (shapeData.element) {
        applyElementPosition(shapeData.element, x, y);
        applyElementSize(shapeData.element, copiedElementData.width, copiedElementData.height, 'shape');
        applyShapeStyle(shapeData.element, shapeData);

        // 选中新创建的元素
        selectShapeElement(shapeData.id);
    }

    updateWidgetDataViews();
}

// 粘贴模块元素
function pasteModuleElement(x, y) {
    const moduleData = addModuleElement(copiedElementData.type);

    // 设置属性
    moduleData.name = copiedElementData.name;
    moduleData.content = copiedElementData.content;
    moduleData.width = copiedElementData.width;
    moduleData.height = copiedElementData.height;
    moduleData.x = x;
    moduleData.y = y;
    moduleData.textSize = copiedElementData.textSize;
    moduleData.textColor = copiedElementData.textColor;
    moduleData.dateFormat = copiedElementData.dateFormat;
    moduleData.enabled = copiedElementData.enabled;
    moduleData.zIndex = copiedElementData.zIndex;

    // 更新元素
    if (moduleData.element) {
        applyElementPosition(moduleData.element, x, y);
        applyElementSize(moduleData.element, copiedElementData.width, copiedElementData.height, 'module');
        applyModuleStyle(moduleData.element, moduleData);

        // 选中新创建的元素
        selectModuleElement(moduleData.id);
    }

    updateWidgetDataViews();
}

// 粘贴指针时钟元素
function pasteAnalogClockElement(x, y) {
    const clockData = addAnalogClockElement();

    // 设置属性
    clockData.name = copiedElementData.name;
    clockData.width = copiedElementData.width;
    clockData.height = copiedElementData.height;
    clockData.x = x;
    clockData.y = y;
    clockData.enabled = copiedElementData.enabled;
    clockData.zIndex = copiedElementData.zIndex;
    clockData.dialImage = copiedElementData.dialImage;
    clockData.hourImage = copiedElementData.hourImage;
    clockData.minuteImage = copiedElementData.minuteImage;
    clockData.secondImage = copiedElementData.secondImage;
    clockData.dialDataUrl = copiedElementData.dialDataUrl;
    clockData.hourDataUrl = copiedElementData.hourDataUrl;
    clockData.minuteDataUrl = copiedElementData.minuteDataUrl;
    clockData.secondDataUrl = copiedElementData.secondDataUrl;

    // 更新元素
    if (clockData.element) {
        applyElementPosition(clockData.element, x, y);
        applyElementSize(clockData.element, copiedElementData.width, copiedElementData.height, 'analog-clock');

        // 更新图片
        updateClockImageInElement(clockData.element, 'dial',
            copiedElementData.dialDataUrl || copiedElementData.dialImage);
        updateClockImageInElement(clockData.element, 'hour',
            copiedElementData.hourDataUrl || copiedElementData.hourImage);
        updateClockImageInElement(clockData.element, 'minute',
            copiedElementData.minuteDataUrl || copiedElementData.minuteImage);
        updateClockImageInElement(clockData.element, 'second',
            copiedElementData.secondDataUrl || copiedElementData.secondImage);

        // 选中新创建的元素
        selectAnalogClockElement(clockData.id);
    }

    updateWidgetDataViews();
}

// 删除选中的元素
function deleteSelectedElement() {
    if (!selectedElement) {
        console.warn('没有选中任何元素');
        return;
    }

    const elementType = selectedElement.dataset.type;

    switch (elementType) {
        case 'material':
            deleteMaterial(selectedElement.id);
            break;
        case 'text':
            deleteText(selectedElement.id);
            break;
        case 'shape':
            deleteShape(selectedElement.id);
            break;
        case 'module':
            deleteModule(selectedElement.id);
            break;
        case 'analog-clock':
            deleteAnalogClock(selectedElement.id);
            break;
        case 'weather-icon':
            deleteWeatherIcon(selectedElement.id);
            break;
        case 'temperature':
            deleteTemperature(selectedElement.id);
            break;
        default:
            console.warn('不支持删除该类型元素:', elementType);
    }
}

// 初始化渐变编辑器
function initGradientEditor() {
    // 初始化默认颜色停止点
    gradientStops = [
        { position: 0, color: '#BCEEFD', opacity: 100 },
        { position: 100, color: '#FFDBDB', opacity: 100 }
    ];

    // 更新渐变预览
    updateGradientPreview();

    // 渲染颜色停止点
    renderGradientStops();
}

function initShapeGradientEditor() {
    currentShapeData.gradientStops = [
        { position: 0, color: '#BCEEFD', opacity: 100 },
        { position: 100, color: '#FFDBDB', opacity: 100 }
    ];
    currentShapeData.gradientType = 'linear';
    updateShapeGradientPreview();
    renderShapeGradientStops();
}

// 更新渐变预览
function updateGradientPreview() {
    if (gradientStops.length === 0) {
        gradientPreview.style.background = 'transparent';
        return;
    }

    // 根据渐变类型生成渐变字符串
    let gradientString = '';
    const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position);

    switch (currentGradientType) {
        case 'linear':
            gradientString = `linear-gradient(to right, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
        case 'radial':
            gradientString = `radial-gradient(circle, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
    }

    gradientPreview.style.background = gradientString;
}

function updateShapeGradientPreview() {
    if (currentShapeData.gradientStops.length === 0) {
        document.getElementById('shapeGradientPreview').style.background = 'transparent';
        return;
    }

    let gradientString = '';
    const sortedStops = [...currentShapeData.gradientStops].sort((a, b) => a.position - b.position);

    switch (currentShapeData.gradientType) {
        case 'linear':
            gradientString = `linear-gradient(to right, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
        case 'radial':
            gradientString = `radial-gradient(circle, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
    }

    document.getElementById('shapeGradientPreview').style.background = gradientString;
}

// 十六进制颜色转RGB
function hexToRgb(hex) {
    // 移除#号
    hex = hex.replace('#', '');

    // 解析RGB值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

// RGB转十六进制
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// 渲染颜色停止点
function renderGradientStops() {
    // 清空容器
    gradientStopsContainer.innerHTML = '';

    // 按位置排序
    const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position);

    sortedStops.forEach((stop, index) => {
        const stopElement = document.createElement('div');
        stopElement.className = 'gradient-stop';
        stopElement.dataset.position = stop.position;
        stopElement.dataset.color = stop.color;
        stopElement.dataset.opacity = stop.opacity;

        // 修复HTML结构
        stopElement.innerHTML = `
            <input type="number" class="stop-position" value="${stop.position}" min="0" max="100" step="1" style="width: 70px;">
            <input type="color" class="stop-color" value="${stop.color}" style="width: 30px;">
            <input type="text" class="stop-color-value" value="${stop.color}" maxlength="7" style="width: 70px;">
            <input type="number" class="stop-opacity" value="${stop.opacity}" min="0" max="100" step="1" style="width: 70px;">
            <button class="stop-remove" style="width: 20px; height: 20px;">×</button>
        `;

        gradientStopsContainer.appendChild(stopElement);
    });

    // 添加事件监听器
    addGradientStopListeners();

    // 更新预览
    updateGradientPreview();
}

function renderShapeGradientStops() {
    const container = document.getElementById('shapeGradientStopsContainer');
    container.innerHTML = '';

    const sortedStops = [...currentShapeData.gradientStops].sort((a, b) => a.position - b.position);

    sortedStops.forEach((stop, index) => {
        const stopElement = document.createElement('div');
        stopElement.className = 'gradient-stop';
        stopElement.dataset.index = index;

        stopElement.innerHTML = `
            <input type="number" class="stop-position" value="${stop.position}" min="0" max="100" step="1" style="width: 70px;">
            <input type="color" class="stop-color" value="${stop.color}" style="width: 30px;">
            <input type="text" class="stop-color-value" value="${stop.color}" maxlength="7" style="width: 70px;">
            <input type="number" class="stop-opacity" value="${stop.opacity}" min="0" max="100" step="1" style="width: 70px;">
            <button class="stop-remove" style="width: 20px; height: 20px;">×</button>
        `;

        container.appendChild(stopElement);
    });

    addShapeGradientStopListeners();
    updateShapeGradientPreview();
}

// 添加颜色停止点事件监听器
function addGradientStopListeners() {
    // 位置输入
    document.querySelectorAll('.stop-position').forEach(input => {
        input.addEventListener('input', function () {
            const stopElement = this.closest('.gradient-stop');
            if (!stopElement) return;

            // 通过停止点元素的数据属性来查找对应的停止点
            const position = parseInt(stopElement.dataset.position);
            const color = stopElement.dataset.color;
            const opacity = parseInt(stopElement.dataset.opacity);

            const index = gradientStops.findIndex(stop =>
                stop.position === position && stop.color === color && stop.opacity === opacity
            );

            if (index !== -1) {
                gradientStops[index].position = parseInt(this.value) || 0;
                // 更新停止点元素的数据属性
                stopElement.dataset.position = this.value;
                updateGradientPreview();
            }
        });
    });

    // 颜色选择器
    document.querySelectorAll('.stop-color').forEach(input => {
        input.addEventListener('input', function () {
            const stopElement = this.closest('.gradient-stop');
            if (!stopElement) return;

            // 直接从停止点元素获取数据属性
            const position = parseInt(stopElement.dataset.position);
            const color = stopElement.dataset.color;
            const opacity = parseInt(stopElement.dataset.opacity);

            // 在 gradientStops 数组中查找匹配的停止点
            const index = gradientStops.findIndex(stop =>
                stop.position === position &&
                stop.color === color &&
                stop.opacity === opacity
            );

            if (index !== -1) {
                const colorValue = this.value;
                gradientStops[index].color = colorValue;

                // 更新停止点元素的数据属性
                stopElement.dataset.color = colorValue;

                // 更新颜色值输入框
                const colorValueInput = stopElement.querySelector('.stop-color-value');
                if (colorValueInput) {
                    colorValueInput.value = colorValue;
                }

                // 更新渐变预览
                updateGradientPreview();
            }
        });
    });

    // 透明度输入
    document.querySelectorAll('.stop-opacity').forEach(input => {
        input.addEventListener('input', function () {
            const stopElement = this.closest('.gradient-stop');
            if (!stopElement) return;

            const position = parseInt(stopElement.dataset.position);
            const color = stopElement.dataset.color;
            const opacity = parseInt(stopElement.dataset.opacity);

            const index = gradientStops.findIndex(stop =>
                stop.position === position && stop.color === color && stop.opacity === opacity
            );

            if (index !== -1) {
                gradientStops[index].opacity = parseInt(this.value) || 0;
                // 更新停止点元素的数据属性
                stopElement.dataset.opacity = this.value;
                updateGradientPreview();
            }
        });
    });

    // 颜色值输入
    document.querySelectorAll('.stop-color-value').forEach(input => {
        input.addEventListener('input', function () {
            const stopElement = this.closest('.gradient-stop');
            if (!stopElement) return;

            const position = parseInt(stopElement.dataset.position);
            const color = stopElement.dataset.color;
            const opacity = parseInt(stopElement.dataset.opacity);

            const index = gradientStops.findIndex(stop =>
                stop.position === position && stop.color === color && stop.opacity === opacity
            );

            if (index !== -1) {
                let color = this.value;

                // 确保有#号
                if (!color.startsWith('#')) {
                    color = '#' + color;
                }

                // 验证十六进制颜色
                if (/^#[0-9A-F]{6}$/i.test(color)) {
                    gradientStops[index].color = color.toUpperCase();

                    // 更新停止点元素的数据属性
                    stopElement.dataset.color = color.toUpperCase();

                    // 更新颜色选择器
                    const colorPicker = this.parentElement.querySelector('.stop-color-input');
                    if (colorPicker) {
                        colorPicker.value = color.toUpperCase();
                    }

                    updateGradientPreview();
                }
            }
        });
    });

    // 删除按钮
    document.querySelectorAll('.stop-remove').forEach(button => {
        button.addEventListener('click', function () {
            const stopElement = this.closest('.gradient-stop');
            if (!stopElement) return;

            // 直接从停止点元素获取数据属性
            const position = parseInt(stopElement.dataset.position);
            const color = stopElement.dataset.color;
            const opacity = parseInt(stopElement.dataset.opacity);

            // 在 gradientStops 数组中查找匹配的停止点
            const index = gradientStops.findIndex(stop =>
                stop.position === position &&
                stop.color === color &&
                stop.opacity === opacity
            );

            if (index !== -1 && gradientStops.length > 2) {
                gradientStops.splice(index, 1);
                renderGradientStops();
            } else if (gradientStops.length <= 2) {
                alert('至少需要两个颜色停止点');
            }
        });
    });
}

function addShapeGradientStopListeners() {
    document.querySelectorAll('#shapeGradientStopsContainer .stop-position').forEach((input, index) => {
        input.addEventListener('input', function () {
            currentShapeData.gradientStops[index].position = parseInt(this.value) || 0;
            updateShapeGradientPreview();
        });
    });

    document.querySelectorAll('#shapeGradientStopsContainer .stop-color').forEach((input, index) => {
        input.addEventListener('input', function () {
            currentShapeData.gradientStops[index].color = this.value;
            updateShapeGradientPreview();
        });
    });

    document.querySelectorAll('#shapeGradientStopsContainer .stop-opacity').forEach((input, index) => {
        input.addEventListener('input', function () {
            currentShapeData.gradientStops[index].opacity = parseInt(this.value) || 100;
            updateShapeGradientPreview();
        });
    });

    document.querySelectorAll('#shapeGradientStopsContainer .stop-remove').forEach((button, index) => {
        button.addEventListener('click', function () {
            if (currentShapeData.gradientStops.length > 2) {
                currentShapeData.gradientStops.splice(index, 1);
                renderShapeGradientStops();
            } else {
                alert('至少需要两个颜色停止点');
            }
        });
    });
}
// 添加颜色停止点
function addGradientStop() {
    if (gradientStops.length >= 10) {
        alert('最多只能添加10个颜色停止点');
        return;
    }

    // 在中间位置添加新停止点
    const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position);
    let newPosition = 50;

    if (sortedStops.length > 1) {
        // 在最大和最小位置之间找一个位置
        const minPos = sortedStops[0].position;
        const maxPos = sortedStops[sortedStops.length - 1].position;
        newPosition = Math.round((minPos + maxPos) / 2);
    }

    // 生成随机颜色
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    // 添加新停止点
    gradientStops.push({
        position: newPosition,
        color: randomColor,
        opacity: 100
    });

    // 渲染更新后的停止点
    renderGradientStops();
}

function addShapeGradientStop() {
    if (currentShapeData.gradientStops.length >= 10) {
        alert('最多只能添加10个颜色停止点');
        return;
    }

    const sortedStops = [...currentShapeData.gradientStops].sort((a, b) => a.position - b.position);
    let newPosition = 50;

    if (sortedStops.length > 1) {
        const minPos = sortedStops[0].position;
        const maxPos = sortedStops[sortedStops.length - 1].position;
        newPosition = Math.round((minPos + maxPos) / 2);
    }

    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    currentShapeData.gradientStops.push({
        position: newPosition,
        color: randomColor,
        opacity: 100
    });

    renderShapeGradientStops();
}
// 应用渐变背景
function applyGradientBackground() {
    if (gradientStops.length === 0) {
        alert('请至少添加一个颜色停止点');
        return;
    }

    const sortedStops = [...gradientStops].sort((a, b) => a.position - b.position);
    let gradientString = '';

    switch (currentGradientType) {
        case 'linear':
            gradientString = `linear-gradient(to right, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
        case 'radial':
            gradientString = `radial-gradient(circle, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
    }

    // 清除其他背景设置
    currentBackgroundImage = null;
    widgetContainer.style.backgroundImage = 'none';

    // 设置渐变背景
    currentGradient = gradientString;
    widgetContainer.style.background = gradientString;
    widgetContainer.style.backgroundColor = 'transparent';

    // 重置颜色选择器的值
    const bgColorInput = document.getElementById('widgetBgColor');
    const colorPreview = document.querySelector('.color-option.selected');
    if (colorPreview) {
        colorPreview.classList.remove('selected');
    }
    if (bgColorInput) {
        bgColorInput.value = '#ffffff'; // 重置为白色
    }

    updateWidgetDataViews();
}

function applyShapeGradient() {
    if (currentShapeData.gradientStops.length === 0) {
        alert('请至少添加一个颜色停止点');
        return;
    }

    const sortedStops = [...currentShapeData.gradientStops].sort((a, b) => a.position - b.position);
    let gradientString = '';

    switch (currentShapeData.gradientType) {
        case 'linear':
            gradientString = `linear-gradient(to right, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
        case 'radial':
            gradientString = `radial-gradient(circle, ${sortedStops.map(stop =>
                `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100}) ${stop.position}%`
            ).join(', ')})`;
            break;
    }

    // 更新当前形状数据
    currentShapeData.gradient = gradientString;
    currentShapeData.color = ''; // 清除纯色

    // 更新选中的形状元素
    if (selectedElement && selectedElement.dataset.type === 'shape') {
        const shapeData = shapeElements.find(s => s.id === currentShapeData.id);
        if (shapeData) {
            shapeData.gradient = gradientString;
            shapeData.gradientType = currentShapeData.gradientType;
            shapeData.gradientStops = [...currentShapeData.gradientStops];
            shapeData.color = '';

            // 应用渐变到元素
            applyShapeGradientToElement(selectedElement, shapeData);
        }
    }

    // 更新widgetData
    updateWidgetDataViews();
}

function applyShapeGradientToElement(element, shapeData) {
    // 如果形状没有渐变设置，使用默认值
    if (!shapeData.gradientStops || shapeData.gradientStops.length === 0) {
        shapeData.gradientStops = [
            { position: 0, color: '#6A89CC', opacity: 100 },
            { position: 100, color: '#2575FC', opacity: 100 }
        ];
    }
    if (shapeData.gradient) {
        // 创建SVG渐变
        const svg = element.querySelector('svg');
        if (svg) {
            // 清除旧的渐变定义
            const oldDefs = svg.querySelector('defs');
            if (oldDefs) oldDefs.remove();

            // 创建新的渐变定义
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            let gradient;

            switch (shapeData.gradientType) {
                case 'linear':
                    gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    gradient.setAttribute('id', `gradient_${shapeData.id}`);
                    gradient.setAttribute('x1', '0%');
                    gradient.setAttribute('y1', '0%');
                    gradient.setAttribute('x2', '100%');
                    gradient.setAttribute('y2', '0%');
                    break;
                case 'radial':
                    gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
                    gradient.setAttribute('id', `gradient_${shapeData.id}`);
                    gradient.setAttribute('cx', '50%');
                    gradient.setAttribute('cy', '50%');
                    gradient.setAttribute('r', '50%');
                    break;
                default:
                    gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    gradient.setAttribute('id', `gradient_${shapeData.id}`);
                    gradient.setAttribute('x1', '0%');
                    gradient.setAttribute('y1', '0%');
                    gradient.setAttribute('x2', '100%');
                    gradient.setAttribute('y2', '0%');
            }

            // 添加颜色停止点
            const sortedStops = [...shapeData.gradientStops].sort((a, b) => a.position - b.position);
            sortedStops.forEach(stop => {
                const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stopElement.setAttribute('offset', `${stop.position}%`);
                stopElement.setAttribute('stop-color', stop.color);
                stopElement.setAttribute('stop-opacity', stop.opacity / 100);
                gradient.appendChild(stopElement);
            });

            defs.appendChild(gradient);
            svg.insertBefore(defs, svg.firstChild);

            // 应用渐变到形状
            const shape = svg.querySelector('path, rect, ellipse');
            if (shape) {
                shape.setAttribute('fill', `url(#gradient_${shapeData.id})`);
            }
        }
    } else {
        // 恢复纯色
        const svg = element.querySelector('svg');
        if (svg) {
            const shape = svg.querySelector('path, rect, ellipse');
            if (shape) {
                shape.setAttribute('fill', shapeData.color || '#6a89cc');
            }
        }
    }
}
// 清除渐变背景
function clearGradientBackground() {
    currentGradient = null;
    widgetContainer.style.background = document.getElementById('widgetBgColor').value;
    widgetContainer.style.backgroundColor = document.getElementById('widgetBgColor').value;
    widgetContainer.style.backgroundImage = 'none';
    updateWidgetDataViews();
}

function clearShapeGradient() {
    currentShapeData.gradient = null;
    currentShapeData.gradientStops = [
        { position: 0, color: '#BCEEFD', opacity: 100 },
        { position: 100, color: '#FFDBDB', opacity: 100 }
    ];

    // 重置颜色选择器
    document.getElementById('shapeColor').value = '#6a89cc';
    currentShapeData.color = '#6a89cc';

    // 更新选中的形状元素
    if (selectedElement && selectedElement.dataset.type === 'shape') {
        const shapeData = shapeElements.find(s => s.id === currentShapeData.id);
        if (shapeData) {
            shapeData.gradient = null;
            shapeData.color = '#6a89cc';

            // 恢复纯色到元素
            const svg = selectedElement.querySelector('svg');
            if (svg) {
                const shape = svg.querySelector('path, rect, ellipse');
                if (shape) {
                    shape.setAttribute('fill', '#6a89cc');
                }
            }
        }
    }

    // 重新初始化渐变编辑器
    initShapeGradientEditor();

    // 更新widgetData
    updateWidgetDataViews();
}
// 初始化拖拽功能
function initDragAndDrop() {
    // Widget拖拽
    makeWidgetDraggable();

    // 为widget添加尺寸控制点
    addResizeHandles(widgetContainer, 'widget');
}

// 更新辅助线
function updateGuideLines() {
    // 清空现有的辅助线
    guideLines.innerHTML = '';

    if (!guidesVisible) {
        guideLines.style.display = 'none';
        return;
    }

    guideLines.style.display = 'block';

    // 获取网格尺寸
    const gridSize = getGridSize();

    // 根据不同的模板创建不同的网格
    if (widgetData.span_x === 4 && widgetData.span_y === 2) {
        // 4x2模板：60x30个格子
        createGridLines(gridSize.x, gridSize.y, 60, 30);
    } else {
        // 2x2模板：30x30个格子
        createGridLines(gridSize.x, gridSize.y, 30, 30);
    }
}

// 创建网格线
function createGridLines(spanX, spanY, gridCols, gridRows) {
    // 创建垂直网格线
    for (let i = 0; i <= gridCols; i++) {
        const line = document.createElement('div');
        line.className = 'guide-line vertical';
        line.style.left = `${(i / gridCols) * 100}%`;
        line.style.backgroundColor = currentGuideColor;
        guideLines.appendChild(line);
    }

    // 创建水平网格线
    for (let i = 0; i <= gridRows; i++) {
        const line = document.createElement('div');
        line.className = 'guide-line horizontal';
        line.style.top = `${(i / gridRows) * 100}%`;
        line.style.backgroundColor = currentGuideColor;
        guideLines.appendChild(line);
    }
}

// 获取当前网格尺寸（格子数）
function getGridSize() {
    if (widgetData.span_x === 4 && widgetData.span_y === 2) {
        return { x: 60, y: 30 };
    } else {
        return { x: 30, y: 30 };
    }
}

/**
 * 将网格数量转换为Web端显示的px字号
 * @param {number} gridSize - 网格数量 (如3表示占用3个格子高度)
 * @returns {number} - 像素大小
 */
function calculateFontSizeFromGrid(gridSize) {
    const gridInfo = getGridSize();
    const logicalHeight = gridInfo.y;  // 2x2和4x2的逻辑高度都是30

    // 获取widget容器的实际像素高度
    const canvasHeightPx = widgetContainer.offsetHeight || 300;

    // 计算缩放比例
    const scaleFactor = canvasHeightPx / logicalHeight;

    // 返回实际字号 (gridSize × scaleFactor)
    return gridSize * scaleFactor;
}

// 格子数转换为像素数（向上取整）
function gridToPx(gridWidth, gridHeight) {
    const widgetWidth = widgetContainer.offsetWidth;
    const widgetHeight = widgetContainer.offsetHeight;
    const gridSize = getGridSize();

    // 向上取整
    const gridWidthInt = Math.ceil(gridWidth);
    const gridHeightInt = Math.ceil(gridHeight);

    const pxWidth = (gridWidthInt / gridSize.x) * widgetWidth;
    const pxHeight = (gridHeightInt / gridSize.y) * widgetHeight;

    return { pxWidth, pxHeight, gridWidth: gridWidthInt, gridHeight: gridHeightInt };
}

// 像素数转换为格子数（向上取整）
function pxToGrid(pxWidth, pxHeight) {
    const widgetWidth = widgetContainer.offsetWidth;
    const widgetHeight = widgetContainer.offsetHeight;
    const gridSize = getGridSize();

    // 向上取整
    const gridWidth = Math.ceil((pxWidth / widgetWidth) * gridSize.x);
    const gridHeight = Math.ceil((pxHeight / widgetHeight) * gridSize.y);

    return { gridWidth, gridHeight };
}

// 清除所有列表项的选中状态
function clearListSelections() {
    document.querySelectorAll('.uploaded-material, .text-material, .shape-material, .module-material, .analog-clock-material, .weather-icon-material, .temperature-material').forEach(item => {
        item.classList.remove('selected');
    });
    widgetContainer.classList.remove('selected');
}

// 清除所有元素的选中状态
function clearElementSelections() {
    // 移除所有选中状态类
    document.querySelectorAll('.draggable-element, .text-element, .shape-element, .module-element, .analog-clock-element, .weather-icon-element, .temperature-element').forEach(el => {
        el.classList.remove('selected');
        // 移除所有拖拽控制点
        const handles = el.querySelectorAll('.resize-handle');
        handles.forEach(handle => {
            handle.remove();
        });
    });

    // 确保widget容器没有被误选中
    widgetContainer.classList.remove('selected');

    // 清除widget容器的尺寸控制点
    const widgetHandles = widgetContainer.querySelectorAll('.resize-handle');
    widgetHandles.forEach(handle => {
        handle.remove();
    });
}

// 上传素材处理
function handleMaterialUpload(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const materialData = {
                id: `material_${materialCounter++}`,
                name: file.name.replace(/\.[^/.]+$/, ""), // 移除扩展名
                dataUrl: e.target.result,
                file: file,
                element: null,
                type: 'image',
                gridWidth: 5,
                gridHeight: 5
            };

            uploadedMaterials.push(materialData);

            // 添加到素材库列表
            addMaterialToList(materialData);

            // 创建可拖拽元素
            createDraggableElement(materialData);

            // 更新容器显示状态
            updateMaterialListVisibility();

            resolve(materialData);
        };

        reader.onerror = function () {
            reject(new Error('文件读取失败'));
        };

        reader.readAsDataURL(file);
    });
}

// 添加素材到列表
function addMaterialToList(materialData) {
    const materialElement = document.createElement('div');
    materialElement.className = 'uploaded-material';
    materialElement.dataset.id = materialData.id;
    materialElement.dataset.name = materialData.name;

    // 创建缩略图
    const img = document.createElement('img');
    img.src = materialData.dataUrl;
    img.alt = materialData.name;

    // 创建名称显示
    const nameSpan = document.createElement('span');
    nameSpan.className = 'uploaded-material-name';
    nameSpan.textContent = materialData.name.length > 10 ?
        materialData.name.substring(0, 8) + '...' : materialData.name;

    // 创建删除按钮
    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'uploaded-material-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteMaterial(materialData.id);
    });

    materialElement.appendChild(img);
    materialElement.appendChild(nameSpan);
    materialElement.appendChild(deleteBtn);

    // 点击选中素材
    materialElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('uploaded-material-delete') ||
            e.target.closest('.uploaded-material-delete')) {
            return;
        }

        e.stopPropagation();

        // 移除所有选中状态
        clearElementSelections();

        // 添加当前选中状态
        this.classList.add('selected');

        // 在widget中选中对应的元素
        const materialId = this.dataset.id;
        selectMaterialElement(materialId);
    });

    uploadedMaterialsList.appendChild(materialElement);

    // 展开素材列表
    uploadedMaterialsList.classList.remove('collapsed');
    uploadedMaterialsHeader.classList.remove('collapsed');
}

// 删除素材
function deleteMaterial(materialId) {
    // 从数组中移除
    const index = uploadedMaterials.findIndex(m => m.id === materialId);
    if (index === -1) return;

    // 从widget中移除元素
    const material = uploadedMaterials[index];
    if (material.element && material.element.parentNode) {
        material.element.parentNode.removeChild(material.element);
    }

    // 从列表中移除
    const materialItem = document.querySelector(`.uploaded-material[data-id="${materialId}"]`);
    if (materialItem && materialItem.parentNode) {
        materialItem.parentNode.removeChild(materialItem);
    }

    // 从数组中删除
    uploadedMaterials.splice(index, 1);

    // 如果当前选中的是这个素材，清除选中状态
    if (selectedElement && selectedElement.id === materialId) {
        selectedElement = null;
        selectWidget();
    }

    // 更新容器显示状态
    updateMaterialListVisibility();

    // 更新widgetData
    updateWidgetDataViews();
}

// 创建可拖拽元素
function createDraggableElement(materialData) {
    const element = document.createElement('div');
    element.className = 'draggable-element';
    element.id = materialData.id;
    element.dataset.type = 'material';
    element.dataset.name = materialData.name;

    // 设置初始位置为widget中心
    const gridSize = getGridSize();
    const centerX = Math.floor(gridSize.x / 2);
    const centerY = Math.floor(gridSize.y / 2);

    // 应用初始位置
    applyElementPosition(element, centerX, centerY);

    // 设置初始尺寸（使用格子数）
    applyElementSize(element, materialData.gridWidth, materialData.gridHeight, 'material');

    // 创建图片
    const img = document.createElement('img');
    img.src = materialData.dataUrl;
    img.alt = materialData.name;

    element.appendChild(img);
    widgetContent.appendChild(element);

    // 保存元素引用
    materialData.element = element;

    // 初始化拖拽
    makeElementDraggable(element, 'material');

    // 添加尺寸控制点
    addResizeHandles(element, 'material');

    // 点击选中元素
    element.addEventListener('mousedown', function (e) {
        // 如果是右键点击，不进行选中操作
        if (e.button === 2) {
            return;
        }
        e.stopPropagation();
        selectElement(this, 'material');
    });

    // 初始选中
    selectMaterialElement(materialData.id);

    // 更新widgetData
    updateWidgetDataViews();
}

// 统一处理元素选中
function selectElement(element, type) {
    // 清除所有选中状态
    clearElementSelections();
    clearListSelections();

    // 移除所有尺寸控制点
    document.querySelectorAll('.resize-handle').forEach(handle => {
        handle.remove();
    });

    // 选中当前元素
    element.classList.add('selected');
    selectedElement = element;

    // 根据类型更新属性面板
    switch (type) {
        case 'material':
            updateMaterialPropertiesPanel(element);
            switchPropertyPanel('material');
            break;
        case 'text':
            updateTextPropertiesPanel(element);
            switchPropertyPanel('text');
            break;
        case 'shape':
            updateShapePropertiesPanel(element);
            switchPropertyPanel('shape');
            break;
        case 'module':
            updateModulePropertiesPanel(element);
            switchPropertyPanel('module');
            break;
        case 'analog-clock':
            updateAnalogClockPropertiesPanel(element);
            switchPropertyPanel('analogClock');
            break;
        case 'weather-icon':
            updateWeatherIconPropertiesPanel(element);
            switchPropertyPanel('weatherIcon');
            break;
        case 'temperature':
            updateTemperaturePropertiesPanel(element);
            switchPropertyPanel('temperature');
            break;
        default:
            selectWidget();
            return
    }

    // 为选中的元素添加尺寸控制点（除了widget）
    if (type !== 'widget' && element !== widgetContainer) {
        addResizeHandles(element, type);
    }

    // 选中对应的列表项
    const listItem = document.querySelector(`.${type}-material[data-id="${element.id}"]`);
    if (listItem) {
        listItem.classList.add('selected');
    }
}

// 应用元素尺寸（使用格子数）
function applyElementSize(element, gridWidth, gridHeight, type) {
    const size = gridToPx(gridWidth, gridHeight);
    element.style.width = size.pxWidth + 'px';
    element.style.height = size.pxHeight + 'px';

    // 保存格子数到dataset
    element.dataset.gridWidth = size.gridWidth;
    element.dataset.gridHeight = size.gridHeight;

    // 根据元素类型更新对应数据
    if (type === 'material') {
        const material = uploadedMaterials.find(m => m.id === element.id);
        if (material) {
            material.gridWidth = size.gridWidth;
            material.gridHeight = size.gridHeight;
        }
    } else if (type === 'text') {
        const textData = textElements.find(t => t.id === element.id);
        if (textData) {
            textData.width = size.gridWidth;
            textData.height = size.gridHeight;
        }
    } else if (type === 'shape') {
        const shapeData = shapeElements.find(s => s.id === element.id);
        if (shapeData) {
            shapeData.width = size.gridWidth;
            shapeData.height = size.gridHeight;
        }
    } else if (type === 'module') {
        const moduleData = moduleElements.find(m => m.id === element.id);
        if (moduleData) {
            moduleData.width = size.gridWidth;
            moduleData.height = size.gridHeight;
        }
    } else if (type === 'analog-clock') {
        const clockData = analogClockElements.find(c => c.id === element.id);
        if (clockData) {
            clockData.width = size.gridWidth;
            clockData.height = size.gridHeight;
        }
    }
}

// 添加文字元素
function addTextElement() {
    const textId = `text_${textCounter++}`;
    const textData = {
        id: textId,
        name: `文字${textCounter}`,
        content: "示例文字",
        enabled: true,
        width: 8,
        height: 4,
        size: 3,
        color: "#000000",
        font: "'Noto Sans SC', sans-serif",
        hAlign: "center",
        vAlign: "center",
        x: 15,
        y: 15,
        rotation: 0,
        opacity: 100,
        zIndex: 10,
        element: null,
        type: 'text'
    };

    textElements.push(textData);

    // 添加到文字列表
    addTextToList(textData);

    // 创建文字元素
    createTextElement(textData);

    // 更新列表显示状态
    updateTextListVisibility();

    return textData;
}

// 添加文字到列表
function addTextToList(textData) {
    const textElement = document.createElement('div');
    textElement.className = 'text-material';
    textElement.dataset.id = textData.id;
    textElement.dataset.name = textData.name;

    // 创建文字内容预览
    const contentDiv = document.createElement('div');
    contentDiv.className = 'text-material-content';
    contentDiv.textContent = textData.content.length > 20 ?
        textData.content.substring(0, 18) + '...' : textData.content;

    // 创建名称显示
    const nameSpan = document.createElement('span');
    nameSpan.className = 'text-material-name';
    nameSpan.textContent = textData.name;

    // 创建删除按钮
    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'text-material-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteText(textData.id);
    });

    textElement.appendChild(contentDiv);
    textElement.appendChild(nameSpan);
    textElement.appendChild(deleteBtn);

    // 点击选中文字
    textElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('text-material-delete') ||
            e.target.closest('.text-material-delete')) {
            return;
        }

        e.stopPropagation();

        // 移除所有选中状态
        clearElementSelections();

        // 添加当前选中状态
        this.classList.add('selected');

        // 在widget中选中对应的元素
        const textId = this.dataset.id;
        selectTextElement(textId);
    });

    textMaterialsList.appendChild(textElement);

    // 展开文字列表
    textMaterialsList.classList.remove('collapsed');
    textMaterialsHeader.classList.remove('collapsed');
}

// 删除文字
function deleteText(textId) {
    // 从数组中移除
    const index = textElements.findIndex(t => t.id === textId);
    if (index === -1) return;

    // 从widget中移除元素
    const text = textElements[index];
    if (text.element && text.element.parentNode) {
        text.element.parentNode.removeChild(text.element);
    }

    // 从列表中移除
    const textItem = document.querySelector(`.text-material[data-id="${textId}"]`);
    if (textItem && textItem.parentNode) {
        textItem.parentNode.removeChild(textItem);
    }

    // 从数组中删除
    textElements.splice(index, 1);

    // 如果当前选中的是这个文字，清除选中状态
    if (selectedElement && selectedElement.id === textId) {
        selectedElement = null;
        selectWidget();
    }

    // 更新容器显示状态
    updateTextListVisibility();

    // 更新widgetData
    updateWidgetDataViews();
}

// 创建文字元素
function createTextElement(textData) {
    const element = document.createElement('div');
    element.className = 'text-element';
    element.id = textData.id;
    element.dataset.type = 'text';
    element.dataset.name = textData.name;

    // 应用初始位置
    applyElementPosition(element, textData.x, textData.y);

    // 应用初始尺寸（使用格子数）
    applyElementSize(element, textData.width, textData.height, 'text');

    // 创建文字内容
    const contentSpan = document.createElement('span');
    contentSpan.className = 'text-element-content';
    contentSpan.textContent = textData.content;

    element.appendChild(contentSpan);
    widgetContent.appendChild(element);

    // 应用文字样式
    applyTextStyle(element, textData);

    // 保存元素引用
    textData.element = element;

    // 初始化拖拽和尺寸调整
    makeElementDraggable(element, 'text');
    addResizeHandles(element, 'text');

    // 点击选中元素
    element.addEventListener('mousedown', function (e) {
        if (e.button === 2) {
            return;
        }
        e.stopPropagation();
        selectElement(this, 'text');
    });

    // 初始选中
    selectTextElement(textData.id);

    // 更新widgetData
    updateWidgetDataViews();
}

// 添加形状元素
function addShapeElement(type) {
    const shapeId = `shape_${shapeCounter++}`;

    // 根据形状类型设置名称 - 使用对象映射简化
    const shapeNameMap = {
        'rectangle': '矩形',
        'circle': '圆形',
        'triangle': '三角形',
        'rounded-triangle': '圆角三角形',
        'diamond': '菱形',
        'star': '五角星',
        'fat-star': '胖五角星',
        'rounded-star': '圆角五角星',
        'hex-star': '六角星',
        'pentagon': '五边形',
        'hexagon': '六边形',
        'octagon': '八边形',
        'capsule': '胶囊型',
        'rounded-rectangle': '圆角矩形',
        'rectangle-long': '长方形',
        'ellipse': '椭圆形'
    };

    const shapeName = shapeNameMap[type] ? `${shapeNameMap[type]}${shapeCounter}` : `形状${shapeCounter}`;

    const shapeData = {
        id: shapeId,
        name: shapeName,
        type: type,
        enabled: true,
        width: 5,
        height: 5,
        color: "#6a89cc",
        x: 15,
        y: 15,
        rotation: 0,
        opacity: 100,
        zIndex: 10,
        element: null,
        gradient: null,
        gradientType: 'linear',
        gradientStops: [
            { position: 0, color: '#BCEEFD', opacity: 100 },
            { position: 100, color: '#FFDBDB', opacity: 100 }
        ]
    };

    shapeElements.push(shapeData);

    // 添加到形状列表
    addShapeToList(shapeData);

    // 创建形状元素
    createShapeElement(shapeData);

    // 更新列表显示状态
    updateShapeListVisibility();

    return shapeData;
}

// 添加形状到列表
function addShapeToList(shapeData) {
    const shapeElement = document.createElement('div');
    shapeElement.className = 'shape-material';
    shapeElement.dataset.id = shapeData.id;
    shapeElement.dataset.name = shapeData.name;
    shapeElement.dataset.type = shapeData.type;

    // 创建形状预览
    const shapePreview = document.createElement('div');
    shapePreview.className = 'shape-preview';

    // 根据形状类型设置SVG
    let svgContent = '';
    switch (shapeData.type) {
        case 'rectangle':
            svgContent = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#6A89CC"/></svg>`;
            break;
        case 'circle':
            svgContent = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" rx="100" fill="#6A89CC"/></svg>`;
            break;
        case 'triangle':
            svgContent = `<svg width="174" height="150" viewBox="0 0 174 150" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M86.6025 0L173.205 150H0L86.6025 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'rounded-triangle':
            svgContent = `<svg width="133" height="122" viewBox="0 0 133 122" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.8983 14C52.6755 -4.66667 79.6185 -4.66667 90.3957 14L128.501 80C139.278 98.6667 125.806 122 104.252 122H28.0419C6.48744 122 -6.98406 98.6667 3.79314 80L41.8983 14Z" fill="#6A89CC"/></svg>`;
            break;
        case 'diamond':
            svgContent = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 0L127.009 72.9909L200 100L127.009 127.009L100 200L72.9909 127.009L0 100L72.9909 72.9909L100 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'star':
            svgContent = `<svg width="191" height="181" viewBox="0 0 191 181" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M95.1055 0L117.557 69.0983H190.211L131.433 111.803L153.884 180.902L95.1055 138.197L36.3269 180.902L58.7783 111.803L-0.000183105 69.0983H72.6541L95.1055 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'fat-star':
            svgContent = `<svg width="191" height="181" viewBox="0 0 191 181" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M95.1055 0L128.609 53.886L190.211 69.0983L149.316 117.614L153.884 180.902L95.1055 157L36.3269 180.902L40.8952 117.614L-0.000183105 69.0983L61.6017 53.886L95.1055 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'rounded-star':
            svgContent = `<svg width="141" height="135" viewBox="0 0 141 135" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M58.7836 8.29182C62.3758 -2.7639 78.0167 -2.76388 81.609 8.29185L89.9535 33.9737C91.56 38.918 96.1675 42.2655 101.366 42.2655H128.37C139.994 42.2655 144.828 57.1409 135.423 63.9737L113.577 79.846C109.371 82.9018 107.611 88.3182 109.218 93.2624L117.562 118.944C121.154 130 108.501 139.194 99.096 132.361L77.2497 116.488C73.0439 113.433 67.3487 113.433 63.1429 116.488L41.2965 132.361C31.892 139.194 19.2382 130 22.8304 118.944L31.175 93.2624C32.7815 88.3182 31.0216 82.9018 26.8157 79.846L4.96939 63.9737C-4.43517 57.1409 0.398158 42.2655 12.0228 42.2655H39.0264C44.2251 42.2655 48.8326 38.918 50.4391 33.9737L58.7836 8.29182Z" fill="#6A89CC"/></svg>`;
            break;
        case 'hex-star':
            svgContent = `<svg width="174" height="200" viewBox="0 0 174 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M86.6025 0L119.603 42.8423L173.205 50L152.603 100L173.205 150L119.603 157.158L86.6025 200L53.6025 157.158L0 150L20.6025 100L0 50L53.6025 42.8423L86.6025 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'pentagon':
            svgContent = `<svg width="191" height="181" viewBox="0 0 191 181" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M95.1055 0L190.211 69.0983L153.884 180.902H36.3269L-0.000183105 69.0983L95.1055 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'hexagon':
            svgContent = `<svg width="174" height="200" viewBox="0 0 174 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M86.6025 0L173.205 50V150L86.6025 200L0 150V50L86.6025 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'octagon':
            svgContent = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 0L170.711 29.2893L200 100L170.711 170.711L100 200L29.2893 170.711L0 100L29.2893 29.2893L100 0Z" fill="#6A89CC"/></svg>`;
            break;
        case 'capsule':
            svgContent = `<svg width="250" height="100" viewBox="0 0 250 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="250" height="100" rx="50" fill="#6A89CC"/></svg>`;
            break;
        case 'rounded-rectangle':
            svgContent = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" rx="40" fill="#6A89CC"/></svg>`;
            break;
        case 'rectangle-long':
            svgContent = `<svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="#6A89CC"/></svg>`;
            break;
        case 'ellipse':
            svgContent = `<svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="100" cy="50" rx="100" ry="50" fill="#6A89CC"/></svg>`;
            break;
        default:
            svgContent = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#6A89CC"/></svg>`;
    }

    shapePreview.innerHTML = svgContent;

    // 创建名称显示
    const nameSpan = document.createElement('span');
    nameSpan.className = 'shape-material-name';
    nameSpan.textContent = shapeData.name;

    // 创建删除按钮
    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'shape-material-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteShape(shapeData.id);
    });

    shapeElement.appendChild(shapePreview);
    shapeElement.appendChild(nameSpan);
    shapeElement.appendChild(deleteBtn);

    // 点击选中形状
    shapeElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('shape-material-delete') ||
            e.target.closest('.shape-material-delete')) {
            return;
        }

        e.stopPropagation();

        // 移除所有选中状态
        clearElementSelections();

        // 添加当前选中状态
        this.classList.add('selected');

        // 在widget中选中对应的元素
        const shapeId = this.dataset.id;
        selectShapeElement(shapeId);
    });

    shapeMaterialsList.appendChild(shapeElement);

    // 展开形状列表
    shapeMaterialsList.classList.remove('collapsed');
    shapeMaterialsHeader.classList.remove('collapsed');
}

// 删除形状
function deleteShape(shapeId) {
    // 从数组中移除
    const index = shapeElements.findIndex(s => s.id === shapeId);
    if (index === -1) return;

    // 从widget中移除元素
    const shape = shapeElements[index];
    if (shape.element && shape.element.parentNode) {
        shape.element.parentNode.removeChild(shape.element);
    }

    // 从列表中移除
    const shapeItem = document.querySelector(`.shape-material[data-id="${shapeId}"]`);
    if (shapeItem && shapeItem.parentNode) {
        shapeItem.parentNode.removeChild(shapeItem);
    }

    // 从数组中删除
    shapeElements.splice(index, 1);

    // 如果当前选中的是这个形状，清除选中状态
    if (selectedElement && selectedElement.id === shapeId) {
        selectedElement = null;
        selectWidget();
    }

    // 更新容器显示状态
    updateShapeListVisibility();

    // 更新widgetData
    updateWidgetDataViews();
}

// 创建形状元素
function createShapeElement(shapeData) {
    const element = document.createElement('div');
    element.className = 'shape-element';
    element.id = shapeData.id;
    element.dataset.type = 'shape';
    element.dataset.shapeType = shapeData.type;
    element.dataset.name = shapeData.name;

    // 应用初始位置
    applyElementPosition(element, shapeData.x, shapeData.y);

    // 应用初始尺寸（使用格子数）
    applyElementSize(element, shapeData.width, shapeData.height, 'shape');

    // 创建形状SVG
    let svgContent = '';
    switch (shapeData.type) {
        case 'rectangle':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="${shapeData.color}"/></svg>`;
            break;
        case 'circle':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" rx="100" fill="${shapeData.color}"/></svg>`;
            break;
        case 'triangle':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 174 150" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M86.6025 0L173.205 150H0L86.6025 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'rounded-triangle':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 133 122" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.8983 14C52.6755 -4.66667 79.6185 -4.66667 90.3957 14L128.501 80C139.278 98.6667 125.806 122 104.252 122H28.0419C6.48744 122 -6.98406 98.6667 3.79314 80L41.8983 14Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'diamond':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 0L127.009 72.9909L200 100L127.009 127.009L100 200L72.9909 127.009L0 100L72.9909 72.9909L100 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'star':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 191 181" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M95.1055 0L117.557 69.0983H190.211L131.433 111.803L153.884 180.902L95.1055 138.197L36.3269 180.902L58.7783 111.803L-0.000183105 69.0983H72.6541L95.1055 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'fat-star':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 191 181" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M95.1055 0L128.609 53.886L190.211 69.0983L149.316 117.614L153.884 180.902L95.1055 157L36.3269 180.902L40.8952 117.614L-0.000183105 69.0983L61.6017 53.886L95.1055 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'rounded-star':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 141 135" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M58.7836 8.29182C62.3758 -2.7639 78.0167 -2.76388 81.609 8.29185L89.9535 33.9737C91.56 38.918 96.1675 42.2655 101.366 42.2655H128.37C139.994 42.2655 144.828 57.1409 135.423 63.9737L113.577 79.846C109.371 82.9018 107.611 88.3182 109.218 93.2624L117.562 118.944C121.154 130 108.501 139.194 99.096 132.361L77.2497 116.488C73.0439 113.433 67.3487 113.433 63.1429 116.488L41.2965 132.361C31.892 139.194 19.2382 130 22.8304 118.944L31.175 93.2624C32.7815 88.3182 31.0216 82.9018 26.8157 79.846L4.96939 63.9737C-4.43517 57.1409 0.398158 42.2655 12.0228 42.2655H39.0264C44.2251 42.2655 48.8326 38.918 50.4391 33.9737L58.7836 8.29182Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'hex-star':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 174 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M86.6025 0L119.603 42.8423L173.205 50L152.603 100L173.205 150L119.603 157.158L86.6025 200L53.6025 157.158L0 150L20.6025 100L0 50L53.6025 42.8423L86.6025 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'pentagon':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 191 181" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M95.1055 0L190.211 69.0983L153.884 180.902H36.3269L-0.000183105 69.0983L95.1055 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'hexagon':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 174 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M86.6025 0L173.205 50V150L86.6025 200L0 150V50L86.6025 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'octagon':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 0L170.711 29.2893L200 100L170.711 170.711L100 200L29.2893 170.711L0 100L29.2893 29.2893L100 0Z" fill="${shapeData.color}"/></svg>`;
            break;
        case 'capsule':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 250 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="250" height="100" rx="50" fill="${shapeData.color}"/></svg>`;
            break;
        case 'rounded-rectangle':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" rx="40" fill="${shapeData.color}"/></svg>`;
            break;
        case 'rectangle-long':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="${shapeData.color}"/></svg>`;
            break;
        case 'ellipse':
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="100" cy="50" rx="100" ry="50" fill="${shapeData.color}"/></svg>`;
            break;
        default:
            svgContent = `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="${shapeData.color}"/></svg>`;
    }

    element.innerHTML = svgContent;
    widgetContent.appendChild(element);

    // 应用形状样式
    applyShapeStyle(element, shapeData);

    // 保存元素引用
    shapeData.element = element;

    // 初始化拖拽和尺寸调整
    makeElementDraggable(element, 'shape');
    addResizeHandles(element, 'shape');

    // 点击选中元素
    element.addEventListener('mousedown', function (e) {
        if (e.button === 2) {
            return;
        }
        e.stopPropagation();
        selectElement(this, 'shape');
    });

    // 初始选中
    selectShapeElement(shapeData.id);

    // 更新widgetData
    updateWidgetDataViews();
}

// 添加模块元素
function addModuleElement(type) {
    if (type === 'weather') {
        // 同时创建天气图标和温度文本
        const iconData = addWeatherIconElement();
        const tempData = addTemperatureElement();

        // 确保温度文本被正确添加到模块列表
        // 确保温度文本有正确的元素引用
        if (tempData && tempData.element) {
            // 确保温度文本样式正确应用
            applyTemperatureStyle(tempData.element, tempData);
        }

        // 更新元素位置
        if (iconData.element) {
            applyElementPosition(iconData.element, iconData.x, iconData.y);
        }
        if (tempData.element) {
            applyElementPosition(tempData.element, tempData.x, tempData.y);
        }

        // 选中新创建的天气图标
        if (iconData.element) {
            selectWeatherIconElement(iconData.id);
        }

        return { icon: iconData, temperature: tempData };
    }

    if (type === 'analog_clock') {
        const analogClockData = addAnalogClockElement();
        if (analogClockData.element) {
            applyElementPosition(analogClockData.element, analogClockData.x, analogClockData.y);
        }
        return { analogClock: analogClockData };
    }

    const moduleId = `module_${moduleCounter++}`;
    let moduleName, moduleContent;

    switch (type) {
        case 'clock':
            moduleName = `时钟${moduleCounter}`;
            moduleContent = "23:59";
            break;
        case 'calendar':
            moduleName = `日历${moduleCounter}`;
            moduleContent = "Dec 15";
            break;
        case 'week':
            moduleName = `星期${moduleCounter}`;
            moduleContent = "Dec 15th, Mon";
            break;
        case 'battery':
            moduleName = `电池${moduleCounter}`;
            moduleContent = "85%";
            break;
        case 'countdown':
            moduleName = `倒计时${moduleCounter}`;
            moduleContent = "20";
            break;
        case 'memory':
            moduleName = `内存${moduleCounter}`;
            moduleContent = "8.0GB";
            break;
        case 'today-length':
            moduleName = `今日已过去${moduleCounter}`;
            moduleContent = "60%";
            break;
        default:
            moduleName = `模块${moduleCounter}`;
            moduleContent = "模块";
    }

    // 更新模块数据结构以支持新的导出格式
    const moduleData = {
        id: moduleId,
        name: moduleName,
        type: type,
        content: moduleContent,
        enabled: true,
        width: 12,
        height: 5,
        x: 15,
        y: 15,
        zIndex: 10,
        element: null,
        textSize: 3,
        textColor: "#000000",
        dateFormat: "MMM dd", 
        weekFormat: "MMMM dd'th', 'week'", 
        hAlign: "center", 
        vAlign: "center",  
        role_color: "on_surface",
        text_font: "Birthstone-Regular.ttf"
    };

    if (type === 'calendar') {
        moduleData.dateFormat = "MMM dd"; // 初始值
    }
    if (type === 'week') {
        moduleData.weekFormat = "MMMM dd'th', 'week'";
    }
    if (type === 'clock') {
        moduleData.text_format = "HH:mm";
    }

    moduleElements.push(moduleData);

    // 添加到模块列表
    addModuleToList(moduleData, moduleData.type || 'module');

    // 创建模块元素
    createModuleElement(moduleData);

    // 选中新创建的模块
    selectModuleElement(moduleData.id);

    // 更新列表显示状态
    updateModuleListVisibility();

    return moduleData;
}

// 添加模块到列表
function addModuleToList(moduleData, moduleType = 'module') {
    const moduleElement = document.createElement('div');
    moduleElement.className = 'text-material module-material';
    moduleElement.dataset.id = moduleData.id;
    moduleElement.dataset.name = moduleData.name;
    moduleElement.dataset.type = moduleType;

    // 创建模块内容预览
    const contentDiv = document.createElement('div');
    contentDiv.className = 'text-material-content';
    contentDiv.textContent = moduleData.content || moduleData.name;

    // 创建名称显示
    const nameSpan = document.createElement('span');
    nameSpan.className = 'text-material-name';
    nameSpan.textContent = moduleData.name;

    // 创建删除按钮
    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'text-material-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

    // 统一的删除函数
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        switch (moduleType) {
            case 'analog-clock':
                deleteAnalogClock(moduleData.id);
                break;
            case 'weather-icon':
                deleteWeatherIcon(moduleData.id);
                break;
            case 'temperature':
                deleteTemperature(moduleData.id);
                break;
            default: // 'module' 和其他类型
                deleteModule(moduleData.id);
                break;
        }
    });

    moduleElement.appendChild(contentDiv);
    moduleElement.appendChild(nameSpan);
    moduleElement.appendChild(deleteBtn);

    // 统一的点击选中事件
    moduleElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('text-material-delete') ||
            e.target.closest('.text-material-delete')) {
            return;
        }

        e.stopPropagation();

        // 移除所有选中状态
        clearElementSelections();

        // 添加当前选中状态
        this.classList.add('selected');

        // 在widget中选中对应的元素
        const moduleId = this.dataset.id;
        const elementType = this.dataset.type;

        switch (elementType) {
            case 'weather-icon':
                selectWeatherIconElement(moduleId);
                break;
            case 'temperature':
                selectTemperatureElement(moduleId);
                break;
            default:
                selectModuleElement(moduleId);
                break;
        }
    });

    moduleMaterialsList.appendChild(moduleElement);

    // 展开模块列表
    moduleMaterialsList.classList.remove('collapsed');
    moduleMaterialsHeader.classList.remove('collapsed');

    // 更新容器显示状态
    updateModuleListVisibility();
}

// 删除模块
function deleteModule(moduleId) {
    // 从数组中移除
    const index = moduleElements.findIndex(m => m.id === moduleId);
    if (index === -1) return;

    // 从widget中移除元素
    const module = moduleElements[index];
    if (module.element && module.element.parentNode) {
        module.element.parentNode.removeChild(module.element);
    }

    // 从列表中移除
    const moduleItem = document.querySelector(`.module-material[data-id="${moduleId}"]`);
    if (moduleItem && moduleItem.parentNode) {
        moduleItem.parentNode.removeChild(moduleItem);
    }

    // 从数组中删除
    moduleElements.splice(index, 1);

    // 如果当前选中的是这个模块，清除选中状态
    if (selectedElement && selectedElement.id === moduleId) {
        selectedElement = null;
        selectWidget();
    }

    // 更新容器显示状态
    updateModuleListVisibility();

    // 更新widgetData
    updateWidgetDataViews();
}

// 创建模块元素
function createModuleElement(moduleData) {
    const element = document.createElement('div');
    element.className = 'text-element module-element';
    element.id = moduleData.id;
    element.dataset.type = 'module';
    element.dataset.moduleType = moduleData.type;
    element.dataset.name = moduleData.name;

    // 应用初始位置
    applyElementPosition(element, moduleData.x, moduleData.y);

    // 应用初始尺寸（使用格子数）
    applyElementSize(element, moduleData.width, moduleData.height, 'module');

    // 创建模块内容
    const contentSpan = document.createElement('span');
    contentSpan.className = 'text-element-content';

    // 根据模块类型设置内容
    switch (moduleData.type) {
        case 'clock':
            contentSpan.textContent = moduleData.content || "23:59";
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = moduleData.textSize + 'px' || "24px";
            element.style.backgroundColor = 'transparent';
            break;
        case 'weather':
            contentSpan.textContent = moduleData.content || "N/A";
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = moduleData.textSize + 'px' || "24px";
            element.style.backgroundColor = 'transparent';
            break;
        case 'calendar':
            let calendarContent;
            // 使用模块的dateFormat或默认值
            const dateFormat = moduleData.dateFormat || "MM/dd";
            // 根据格式生成内容
            switch (dateFormat) {
                case 'MMM dd':
                    calendarContent = "Dec 15";
                    break;
                case 'EEE':
                    calendarContent = "Mon";
                    break;
            }

            contentSpan.textContent = calendarContent;
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = calculateFontSizeFromGrid(moduleData.textSize) + 'px';
            element.style.backgroundColor = 'transparent';
            break;
        case 'week':
            let weekContent;
            // 使用模块的weekFormat或默认值
            const weekFormat = moduleData.weekFormat || "MMMM dd'th', 'week'";
            // 根据格式生成内容
            switch (weekFormat) {
                case "MMMM dd'th', 'week'":
                    weekContent = "Dec 15th, Mon";
                    break;
                case 'Week: ww/52':
                    weekContent = "Week: 43/52";
                    break;
                case 'Wk: ww/52':
                    weekContent = "Wk: 43/52";
                    break;
                case 'ww':
                    weekContent = "43";
                    break;
                case 'ww/52':
                    weekContent = "43/52";
                    break;
                case 'Wk ww':
                    weekContent = "Wk 43";
                    break;
                default:
                    weekContent = "MMMM dd'th', 'week'";
            }

            contentSpan.textContent = weekContent;
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = calculateFontSizeFromGrid(moduleData.textSize) + 'px';
            element.style.backgroundColor = 'transparent';
            break;
        case 'battery':
            contentSpan.textContent = moduleData.content || "85%";
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = calculateFontSizeFromGrid(moduleData.textSize) + 'px';
            element.style.backgroundColor = 'transparent';
            break;
        case 'countdown':
            contentSpan.textContent = moduleData.content || "20";
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = calculateFontSizeFromGrid(moduleData.textSize) + 'px';
            element.style.backgroundColor = 'transparent';
            break;
        case 'memory':
            contentSpan.textContent = moduleData.content || "8.0GB";
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = calculateFontSizeFromGrid(moduleData.textSize) + 'px';
            element.style.backgroundColor = 'transparent';
            break;
        case 'today-length':
            // 计算今日已过去百分比
            contentSpan.textContent = moduleData.content || "60%";
            contentSpan.style.color = moduleData.textColor || "#000000";
            contentSpan.style.fontSize = calculateFontSizeFromGrid(moduleData.textSize) + 'px';
            element.style.backgroundColor = 'transparent';
            break;
    }

    element.appendChild(contentSpan);
    widgetContent.appendChild(element);

    // 应用模块样式
    applyModuleStyle(element, moduleData);

    // 保存元素引用
    moduleData.element = element;

    // 初始化拖拽和尺寸调整
    makeElementDraggable(element, 'module');
    addResizeHandles(element, 'module');

    // 点击选中元素
    element.addEventListener('mousedown', function (e) {
        if (e.button === 2) {
            return;
        }
        e.stopPropagation();
        selectElement(this, 'module');
    });

    // 更新widgetData
    updateWidgetDataViews();
}

// 添加指针时钟元素
function addAnalogClockElement() {
    const clockId = `analog_clock_${analogClockCounter++}`;
    const clockData = {
        id: clockId,
        name: `指针时钟${analogClockCounter}`,
        type: 'analog-clock',
        enabled: true,
        width: 15,
        height: 15,
        x: 2,
        y: 2,
        zIndex: 10,
        element: null,
        dialImage: './resources/clock_dial.png',
        hourImage: './resources/clock_hour.png',
        minuteImage: './resources/clock_minute.png',
        secondImage: './resources/clock_second.png',
        dialDataUrl: null,
        hourDataUrl: null,
        minuteDataUrl: null,
        secondDataUrl: null
    };

    analogClockElements.push(clockData);

    // 创建时钟元素
    createAnalogClockElement(clockData);

    // 添加到模块列表
    addModuleToList({
        id: clockData.id,
        name: clockData.name,
        type: 'analog-clock',
        content: '指针时钟'
    }, 'analog-clock');

    // 更新列表显示状态
    updateModuleListVisibility();

    // 选中新创建的指针时钟
    selectAnalogClockElement(clockData.id);

    return clockData;
}

// 添加天气图标元素
function addWeatherIconElement() {
    const weatherIconId = `weather_icon_${weatherIconCounter++}`;
    const weatherIconData = {
        id: weatherIconId,
        name: `天气图标${weatherIconCounter}`,
        type: 'weather-icon',
        enabled: true,
        width: 5,
        height: 5,
        x: 15,
        y: 15,
        zIndex: 10,
        imageUrl: './resources/weather.png',
        element: null
    };

    weatherIconElements.push(weatherIconData);

    // 创建天气图标元素
    createWeatherIconElement(weatherIconData);

    // 添加到模块列表
    addModuleToList({
        id: weatherIconData.id,
        name: weatherIconData.name,
        type: 'weather-icon',
        content: '天气图标'
    }, 'weather-icon');

    // 更新列表显示状态
    updateModuleListVisibility();

    // 选中新创建的天气图标
    selectWeatherIconElement(weatherIconData.id);

    return weatherIconData;
}

// 添加温度文本元素
function addTemperatureElement() {
    const temperatureId = `temperature_${temperatureCounter++}`;
    const temperatureData = {
        id: temperatureId,
        name: `温度${temperatureCounter}`,
        type: 'temperature',
        enabled: true,
        width: 8,
        height: 5,
        x: 20, // 默认在图标右侧
        y: 15,
        textSize: 3,
        textColor: "#000000",
        content: "N/A",
        zIndex: 10,
        element: null,
        hAlign: "center",
        vAlign: "center"
    };

    temperatureElements.push(temperatureData);

    // 创建温度文本元素
    createTemperatureElement(temperatureData);

    // 添加到模块列表
    addModuleToList({
        id: temperatureData.id,
        name: temperatureData.name,
        type: 'temperature',
        content: temperatureData.content
    }, 'temperature');

    // 更新列表显示状态
    updateModuleListVisibility();

    return temperatureData;
}

// 删除指针时钟
function deleteAnalogClock(clockId) {
    const index = analogClockElements.findIndex(c => c.id === clockId);
    if (index === -1) return;

    const clock = analogClockElements[index];
    if (clock.element && clock.element.parentNode) {
        clock.element.parentNode.removeChild(clock.element);
    }

    // 从模块列表中移除
    const moduleItem = document.querySelector(`.module-material[data-id="${clockId}"]`);
    if (moduleItem && moduleItem.parentNode) {
        moduleItem.parentNode.removeChild(moduleItem);
    }

    analogClockElements.splice(index, 1);

    if (selectedElement && selectedElement.id === clockId) {
        selectedElement = null;
        selectWidget();
    }

    // 更新容器显示状态
    updateModuleListVisibility();
    updateWidgetDataViews();
}

// 删除天气图标
function deleteWeatherIcon(weatherIconId) {
    const index = weatherIconElements.findIndex(w => w.id === weatherIconId);
    if (index === -1) return;

    const weatherIcon = weatherIconElements[index];
    if (weatherIcon.element && weatherIcon.element.parentNode) {
        weatherIcon.element.parentNode.removeChild(weatherIcon.element);
    }

    // 从模块列表中移除
    const moduleItem = document.querySelector(`.module-material[data-id="${weatherIconId}"]`);
    if (moduleItem && moduleItem.parentNode) {
        moduleItem.parentNode.removeChild(moduleItem);
    }

    weatherIconElements.splice(index, 1);

    if (selectedElement && selectedElement.id === weatherIconId) {
        selectedElement = null;
        selectWidget();
    }

    // 更新容器显示状态
    updateModuleListVisibility();
    updateWidgetDataViews();
}

// 删除温度
function deleteTemperature(temperatureId) {
    const index = temperatureElements.findIndex(t => t.id === temperatureId);
    if (index === -1) return;

    const temperature = temperatureElements[index];
    if (temperature.element && temperature.element.parentNode) {
        temperature.element.parentNode.removeChild(temperature.element);
    }

    // 从模块列表中移除
    const moduleItem = document.querySelector(`.module-material[data-id="${temperatureId}"]`);
    if (moduleItem && moduleItem.parentNode) {
        moduleItem.parentNode.removeChild(moduleItem);
    }

    temperatureElements.splice(index, 1);

    if (selectedElement && selectedElement.id === temperatureId) {
        selectedElement = null;
        selectWidget();
    }

    // 更新容器显示状态
    updateModuleListVisibility();
    updateWidgetDataViews();
}

// 创建指针时钟元素
function createAnalogClockElement(clockData) {
    const element = document.createElement('div');
    element.className = 'analog-clock-element';
    element.id = clockData.id;
    element.dataset.type = 'analog-clock';
    element.dataset.name = clockData.name;

    // 设置基本样式
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';

    // 应用初始位置
    applyElementPosition(element, clockData.x, clockData.y);

    // 应用初始尺寸
    applyElementSize(element, clockData.width, clockData.height, 'analog-clock');

    // 保存网格尺寸到dataset
    element.dataset.gridWidth = clockData.width;
    element.dataset.gridHeight = clockData.height;

    // 创建时钟图片容器
    const clockContainer = document.createElement('div');
    clockContainer.style.position = 'relative';
    clockContainer.style.width = '100%';
    clockContainer.style.height = '100%';
    clockContainer.style.display = 'flex';
    clockContainer.style.alignItems = 'center';
    clockContainer.style.justifyContent = 'center';
    clockContainer.style.backgroundColor = 'rgba(0,0,0,0)'; // 添加背景色以便调试

    // 创建表盘图片（最底层）
    const dialImg = document.createElement('img');
    dialImg.id = `clock_dial_${clockData.id}`;
    dialImg.src = clockData.dialImage;
    dialImg.alt = '表盘';
    dialImg.style.position = 'absolute';
    dialImg.style.width = '100%';
    dialImg.style.height = '100%';
    dialImg.style.objectFit = 'contain';
    dialImg.style.zIndex = '1';

    // 创建时针图片
    const hourImg = document.createElement('img');
    hourImg.id = `clock_hour_${clockData.id}`;
    hourImg.src = clockData.hourImage;
    hourImg.alt = '时针';
    hourImg.style.position = 'absolute';
    hourImg.style.width = '100%';
    hourImg.style.height = '100%';
    hourImg.style.objectFit = 'contain';
    hourImg.style.zIndex = '2';
    hourImg.style.transform = 'rotate(90deg)'; // 初始指向3点钟方向

    // 创建分针图片
    const minuteImg = document.createElement('img');
    minuteImg.id = `clock_minute_${clockData.id}`;
    minuteImg.src = clockData.minuteImage;
    minuteImg.alt = '分针';
    minuteImg.style.position = 'absolute';
    minuteImg.style.width = '100%';
    minuteImg.style.height = '100%';
    minuteImg.style.objectFit = 'contain';
    minuteImg.style.zIndex = '3';

    // 创建秒针图片
    const secondImg = document.createElement('img');
    secondImg.id = `clock_second_${clockData.id}`;
    secondImg.src = clockData.secondImage;
    secondImg.alt = '秒针';
    secondImg.style.position = 'absolute';
    secondImg.style.width = '100%';
    secondImg.style.height = '100%';
    secondImg.style.objectFit = 'contain';
    secondImg.style.zIndex = '4';

    // 添加图片到容器
    clockContainer.appendChild(dialImg);
    clockContainer.appendChild(hourImg);
    clockContainer.appendChild(minuteImg);
    clockContainer.appendChild(secondImg);

    element.appendChild(clockContainer);
    widgetContent.appendChild(element);

    // 保存元素引用
    clockData.element = element;

    // 初始化拖拽和尺寸调整
    makeElementDraggable(element, 'analog-clock');
    addResizeHandles(element, 'analog-clock');

    // 点击选中元素
    element.addEventListener('mousedown', function (e) {
        if (e.button === 2) return;
        e.stopPropagation();
        selectElement(this, 'analog-clock');
    });

    // 初始选中
    selectAnalogClockElement(clockData.id);

    // 更新指针时钟图片（如果存在dataUrl）
    if (clockData.dialDataUrl) {
        updateClockImageInElement(element, 'dial', clockData.dialDataUrl);
    }
    if (clockData.hourDataUrl) {
        updateClockImageInElement(element, 'hour', clockData.hourDataUrl);
    }
    if (clockData.minuteDataUrl) {
        updateClockImageInElement(element, 'minute', clockData.minuteDataUrl);
    }
    if (clockData.secondDataUrl) {
        updateClockImageInElement(element, 'second', clockData.secondDataUrl);
    }

    updateWidgetDataViews();
    return element;
}

// 创建天气图标元素
function createWeatherIconElement(weatherIconData) {
    const element = document.createElement('div');
    element.className = 'weather-icon-element';
    element.id = weatherIconData.id;
    element.dataset.type = 'weather-icon';
    element.dataset.name = weatherIconData.name;

    // 确保元素有正确的定位和样式
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';

    // 应用初始位置
    applyElementPosition(element, weatherIconData.x, weatherIconData.y);

    // 应用初始尺寸（使用格子数）
    applyElementSize(element, weatherIconData.width, weatherIconData.height, 'weather-icon');

    // 创建图片
    const img = document.createElement('img');
    img.src = weatherIconData.imageUrl;
    img.alt = '天气图标';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.pointerEvents = 'none'; // 防止图片干扰拖拽事件

    element.appendChild(img);
    widgetContent.appendChild(element);

    // 应用天气图标样式
    applyWeatherIconStyle(element, weatherIconData);

    // 保存元素引用
    weatherIconData.element = element;

    // 初始化拖拽和尺寸调整 - 确保这些被调用
    makeElementDraggable(element, 'weather-icon');
    addResizeHandles(element, 'weather-icon');

    // 点击选中元素
    element.addEventListener('mousedown', function (e) {
        if (e.button === 2) return;
        e.stopPropagation();
        selectElement(this, 'weather-icon');
        e.preventDefault(); // 防止默认行为，确保拖拽功能可以工作
    });

    updateWidgetDataViews();
    return element;
}

// 创建温度文本元素
function createTemperatureElement(temperatureData) {
    const element = document.createElement('div');
    element.className = 'temperature-element';
    element.id = temperatureData.id;
    element.dataset.type = 'temperature';
    element.dataset.name = temperatureData.name;

    // 确保元素有正确的定位
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';

    // 应用初始位置
    applyElementPosition(element, temperatureData.x, temperatureData.y);

    // 应用初始尺寸（使用格子数）
    applyElementSize(element, temperatureData.width, temperatureData.height, 'temperature');

    // 创建温度内容
    const contentSpan = document.createElement('span');
    contentSpan.className = 'temperature-content';
    contentSpan.textContent = temperatureData.content;

    element.appendChild(contentSpan);
    widgetContent.appendChild(element);

    // 应用温度样式
    applyTemperatureStyle(element, temperatureData);

    // 保存元素引用
    temperatureData.element = element;

    // 初始化拖拽和尺寸调整 - 确保这些被调用
    makeElementDraggable(element, 'temperature');
    addResizeHandles(element, 'temperature');

    // 点击选中元素
    element.addEventListener('mousedown', function (e) {
        if (e.button === 2) return;
        e.stopPropagation();
        selectElement(this, 'temperature');
        e.preventDefault();
    });

    updateWidgetDataViews();

    return element;
}

// 应用天气图标样式
function applyWeatherIconStyle(element, weatherIconData) {
    element.style.opacity = weatherIconData.opacity / 100;
    element.style.transform = `rotate(${weatherIconData.rotation}deg)`;
    element.style.zIndex = weatherIconData.zIndex;
    element.style.display = weatherIconData.enabled ? 'flex' : 'none';
}

// 应用温度样式
function applyTemperatureStyle(element, temperatureData) {
    const fontSizePx = calculateFontSizeFromGrid(temperatureData.textSize);
    element.style.fontSize = `${fontSizePx}px`;
    element.style.color = temperatureData.textColor;
    element.style.opacity = temperatureData.opacity ? temperatureData.opacity / 100 : 1;
    element.style.zIndex = temperatureData.zIndex;
    element.style.display = temperatureData.enabled ? 'inline-flex' : 'none';
    element.style.justifyContent =
        temperatureData.hAlign === 'left' ? 'flex-start' :
            temperatureData.hAlign === 'right' ? 'flex-end' : 'center';
    element.style.alignItems =
        temperatureData.vAlign === 'top' ? 'flex-start' :
            temperatureData.vAlign === 'bottom' ? 'flex-end' : 'center';
}

// 应用文字样式
function applyTextStyle(element, textData) {
    const fontSizePx = calculateFontSizeFromGrid(textData.size);
    element.style.fontSize = `${fontSizePx}px`;
    element.style.color = textData.color;
    element.style.fontFamily = textData.font;
    element.style.opacity = textData.opacity / 100;
    element.style.transform = `rotate(${textData.rotation}deg)`;
    element.style.zIndex = textData.zIndex;
    element.style.display = textData.enabled ? 'inline-flex' : 'none';
    // 新增：应用对齐样式
    element.style.justifyContent =
        textData.hAlign === 'left' ? 'flex-start' :
            textData.hAlign === 'right' ? 'flex-end' : 'center';
    element.style.alignItems =
        textData.vAlign === 'top' ? 'flex-start' :
            textData.vAlign === 'bottom' ? 'flex-end' : 'center';
}

// 应用形状样式
function applyShapeStyle(element, shapeData) {
    element.style.opacity = shapeData.opacity / 100;
    element.style.transform = `rotate(${shapeData.rotation}deg)`;
    element.style.zIndex = shapeData.zIndex;
    element.style.display = shapeData.enabled ? 'flex' : 'none';

    // 更新形状颜色或渐变
    const svg = element.querySelector('svg');
    if (svg) {
        // 清除旧的渐变定义
        const oldDefs = svg.querySelector('defs');
        if (oldDefs) oldDefs.remove();

        const shape = svg.querySelector('path, rect, ellipse');
        if (shape) {
            if (shapeData.gradient) {
                // 创建渐变定义
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                let gradient;

                switch (shapeData.gradientType || 'linear') {
                    case 'linear':
                        gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                        gradient.setAttribute('id', `gradient_${shapeData.id}`);
                        gradient.setAttribute('x1', '0%');
                        gradient.setAttribute('y1', '0%');
                        gradient.setAttribute('x2', '100%');
                        gradient.setAttribute('y2', '0%');
                        break;
                    case 'radial':
                        gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
                        gradient.setAttribute('id', `gradient_${shapeData.id}`);
                        gradient.setAttribute('cx', '50%');
                        gradient.setAttribute('cy', '50%');
                        gradient.setAttribute('r', '50%');
                        break;
                    default:
                        gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                        gradient.setAttribute('id', `gradient_${shapeData.id}`);
                        gradient.setAttribute('x1', '0%');
                        gradient.setAttribute('y1', '0%');
                        gradient.setAttribute('x2', '100%');
                        gradient.setAttribute('y2', '0%');
                }

                // 添加颜色停止点
                const stops = shapeData.gradientStops || [
                    { position: 0, color: shapeData.color || '#6a89cc', opacity: 100 },
                    { position: 100, color: shapeData.color || '#6a89cc', opacity: 100 }
                ];

                const sortedStops = [...stops].sort((a, b) => a.position - b.position);
                sortedStops.forEach(stop => {
                    const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stopElement.setAttribute('offset', `${stop.position}%`);
                    stopElement.setAttribute('stop-color', stop.color);
                    stopElement.setAttribute('stop-opacity', stop.opacity / 100);
                    gradient.appendChild(stopElement);
                });

                defs.appendChild(gradient);
                svg.insertBefore(defs, svg.firstChild);
                shape.setAttribute('fill', `url(#gradient_${shapeData.id})`);
            } else {
                shape.setAttribute('fill', shapeData.color || '#6a89cc');
            }
        }
    }
}

// 应用模块样式
function applyModuleStyle(element, moduleData) {
    element.style.zIndex = moduleData.zIndex;
    element.style.display = moduleData.enabled ? 'inline-flex' : 'none';
    element.style.backgroundColor = 'transparent'; // 确保背景透明
    element.style.border = 'none'; // 移除边框
    element.style.boxShadow = 'none'; // 移除阴影

    // 新增：应用对齐样式
    element.style.justifyContent =
        moduleData.hAlign === 'left' ? 'flex-start' :
            moduleData.hAlign === 'right' ? 'flex-end' : 'center';
    element.style.alignItems =
        moduleData.vAlign === 'top' ? 'flex-start' :
            moduleData.vAlign === 'bottom' ? 'flex-end' : 'center';

    // 设置模块样式（使用text-element-content子元素）
    const contentElement = element.querySelector('.text-element-content');
    if (contentElement) {
        contentElement.style.color = moduleData.textColor || "#000000";
        const fontSizePx = calculateFontSizeFromGrid(moduleData.textSize);
        contentElement.style.fontSize = fontSizePx + 'px';
    }
}

// 更新素材列表显示状态
function updateMaterialListVisibility() {
    if (uploadedMaterials.length > 0) {
        uploadedMaterialsContainer.classList.add('has-content');
    } else {
        uploadedMaterialsContainer.classList.remove('has-content');
    }
}

// 更新文字列表显示状态
function updateTextListVisibility() {
    if (textElements.length > 0) {
        textMaterialsContainer.classList.add('has-content');
    } else {
        textMaterialsContainer.classList.remove('has-content');
    }
}

// 更新形状列表显示状态
function updateShapeListVisibility() {
    if (shapeElements.length > 0) {
        shapeMaterialsContainer.classList.add('has-content');
    } else {
        shapeMaterialsContainer.classList.remove('has-content');
    }
}

// 更新模块列表显示状态
function updateModuleListVisibility() {
    const hasModules = moduleElements.length > 0 ||
        weatherIconElements.length > 0 ||
        temperatureElements.length > 0 ||
        analogClockElements.length > 0;

    if (hasModules) {
        moduleMaterialsContainer.classList.add('has-content');
    } else {
        moduleMaterialsContainer.classList.remove('has-content');
    }
}

// 选择Widget
function selectWidget() {
    // 移除所有选中状态
    clearElementSelections();
    clearListSelections();

    // 清除所有元素的拖拽控制点
    document.querySelectorAll('.draggable-element, .text-element, .shape-element, .module-element, .weather-icon-element, .temperature-element').forEach(element => {
        removeResizeHandles(element);
    });

    // 选中Widget
    widgetContainer.classList.add('selected');
    selectedElement = widgetContainer;

    // 为Widget添加尺寸控制点
    addResizeHandles(widgetContainer, 'widget');

    // 切换到Widget属性面板
    switchPropertyPanel('widget');
}

// 选择素材元素
function selectMaterialElement(materialId) {
    const element = document.getElementById(materialId);
    if (element) {
        selectElement(element, 'material');
    }
}

// 选择文字元素
function selectTextElement(textId) {
    const element = document.getElementById(textId);
    if (element) {
        selectElement(element, 'text');
    }
}

// 选择形状元素
function selectShapeElement(shapeId) {
    const element = document.getElementById(shapeId);
    if (element) {
        selectElement(element, 'shape');
    }
}
// 选择模块元素
function selectModuleElement(moduleId) {
    const element = document.getElementById(moduleId);
    if (element) {
        selectElement(element, 'module');
    }
}

// 选择指针时钟元素
function selectAnalogClockElement(clockId) {
    const element = document.getElementById(clockId);
    if (element) {
        selectElement(element, 'analog-clock');
    }
}

// 选择天气图标元素
function selectWeatherIconElement(weatherIconId) {
    const element = document.getElementById(weatherIconId);
    if (element) {
        selectElement(element, 'weather-icon');
    }
}

// 选择温度元素
function selectTemperatureElement(temperatureId) {
    const element = document.getElementById(temperatureId);
    if (element) {
        selectElement(element, 'temperature');
    }
}

// 更新素材属性面板
function updateMaterialPropertiesPanel(element) {
    if (!element) return;

    // 从元素获取数据
    const x = parseInt(element.dataset.x) || 15;
    const y = parseInt(element.dataset.y) || 15;
    const gridWidth = parseInt(element.dataset.gridWidth) || 5;
    const gridHeight = parseInt(element.dataset.gridHeight) || 5;

    // 更新当前素材数据
    currentMaterialData.id = element.id;
    currentMaterialData.name = element.dataset.name || '素材';
    currentMaterialData.enabled = element.style.display !== 'none';
    currentMaterialData.width = gridWidth;
    currentMaterialData.height = gridHeight;
    currentMaterialData.x = x;
    currentMaterialData.y = y;
    currentMaterialData.rotation = parseInt(element.style.transform?.match(/rotate\(([^)]+)deg\)/)?.[1] || 0);
    currentMaterialData.opacity = parseInt(element.style.opacity || 1) * 100;
    currentMaterialData.zIndex = parseInt(element.style.zIndex || 10);

    // 更新UI
    document.getElementById('materialNameDisplay').textContent = currentMaterialData.name;
    document.getElementById('materialWidth').value = currentMaterialData.width;
    document.getElementById('materialHeight').value = currentMaterialData.height;
    document.getElementById('materialX').value = currentMaterialData.x;
    document.getElementById('materialY').value = currentMaterialData.y;
    document.getElementById('materialRotation').value = currentMaterialData.rotation;
    document.getElementById('materialOpacity').value = currentMaterialData.opacity;
}

// 更新文字属性面板
function updateTextPropertiesPanel(element) {
    if (!element) return;

    // 从元素获取数据
    const x = parseInt(element.dataset.x) || 15;
    const y = parseInt(element.dataset.y) || 15;
    const gridWidth = parseInt(element.dataset.gridWidth) || 8;
    const gridHeight = parseInt(element.dataset.gridHeight) || 4;
    const textData = textElements.find(t => t.id === element.id);

    if (textData) {
        // 更新当前文字数据
        currentTextData.id = textData.id;
        currentTextData.name = textData.name;
        currentTextData.content = textData.content;
        currentTextData.enabled = textData.enabled;
        currentTextData.width = gridWidth;
        currentTextData.height = gridHeight;
        currentTextData.size = textData.size;
        currentTextData.color = textData.color;
        currentTextData.font = textData.font;
        currentTextData.x = textData.x;
        currentTextData.y = textData.y;
        currentTextData.rotation = textData.rotation;
        currentTextData.opacity = textData.opacity;
        currentTextData.zIndex = textData.zIndex;

        // 更新UI
        document.getElementById('textContent').value = currentTextData.content;
        document.getElementById('textName').value = currentTextData.name;
        document.getElementById('textWidth').value = currentTextData.width;
        document.getElementById('textHeight').value = currentTextData.height;
        document.getElementById('textSize').value = currentTextData.size;
        document.getElementById('textColor').value = currentTextData.color;
        document.getElementById('textFont').value = currentTextData.font;
        document.getElementById('textX').value = currentTextData.x;
        document.getElementById('textY').value = currentTextData.y;
        document.getElementById('textRotation').value = currentTextData.rotation;
        document.getElementById('textOpacity').value = currentTextData.opacity;
        // 更新对齐按钮状态
        updateAlignmentButtons('text', textData.hAlign, textData.vAlign);
    }
}

// 更新形状属性面板
function updateShapePropertiesPanel(element) {
    if (!element) return;

    // 从元素获取数据
    const x = parseInt(element.dataset.x) || 15;
    const y = parseInt(element.dataset.y) || 15;
    const gridWidth = parseInt(element.dataset.gridWidth) || 5;
    const gridHeight = parseInt(element.dataset.gridHeight) || 5;
    const shapeType = element.dataset.shapeType || 'unknown';
    const shapeData = shapeElements.find(s => s.id === element.id);

    if (shapeData) {
        // 更新当前形状数据
        currentShapeData.id = shapeData.id;
        currentShapeData.name = shapeData.name;
        currentShapeData.type = shapeData.type;
        currentShapeData.enabled = shapeData.enabled;
        currentShapeData.width = gridWidth;
        currentShapeData.height = gridHeight;
        currentShapeData.color = shapeData.color;
        currentShapeData.x = shapeData.x;
        currentShapeData.y = shapeData.y;
        currentShapeData.rotation = shapeData.rotation;
        currentShapeData.opacity = shapeData.opacity;
        currentShapeData.zIndex = shapeData.zIndex;

        // 新增：渐变属性
        currentShapeData.gradient = shapeData.gradient || null;
        currentShapeData.gradientType = shapeData.gradientType || 'linear';
        currentShapeData.gradientStops = shapeData.gradientStops || [
            { position: 0, color: '#6A89CC', opacity: 100 },
            { position: 100, color: '#6A89CC', opacity: 100 }
        ];

        // 更新UI
        document.getElementById('shapeNameDisplay').textContent = currentShapeData.name;
        document.getElementById('shapeTypeDisplay').textContent =
            shapeType === 'rectangle' ? '矩形' :
                shapeType === 'circle' ? '圆形' :
                    shapeType === 'triangle' ? '三角形' :
                        shapeType === 'rounded-triangle' ? '圆角三角形' :
                            shapeType === 'diamond' ? '菱形' :
                                shapeType === 'star' ? '五角星' :
                                    shapeType === 'fat-star' ? '胖五角星' :
                                        shapeType === 'rounded-star' ? '圆角五角星' :
                                            shapeType === 'hex-star' ? '六角星' :
                                                shapeType === 'pentagon' ? '五边形' :
                                                    shapeType === 'hexagon' ? '六边形' :
                                                        shapeType === 'octagon' ? '八边形' :
                                                            shapeType === 'capsule' ? '胶囊型' :
                                                                shapeType === 'rounded-rectangle' ? '圆角矩形' :
                                                                    shapeType === 'rectangle-long' ? '长方形' :
                                                                        shapeType === 'ellipse' ? '椭圆形' : '未知';
        document.getElementById('shapeWidth').value = currentShapeData.width;
        document.getElementById('shapeHeight').value = currentShapeData.height;
        document.getElementById('shapeColor').value = currentShapeData.color;
        document.getElementById('shapeX').value = currentShapeData.x;
        document.getElementById('shapeY').value = currentShapeData.y;
        document.getElementById('shapeRotation').value = currentShapeData.rotation;
        document.getElementById('shapeOpacity').value = currentShapeData.opacity;
        // 更新渐变编辑器
        updateShapeGradientPreview();
        renderShapeGradientStops();
    }
}

// 更新模块属性面板
function updateModulePropertiesPanel(element) {
    if (!element) return;

    // 从元素获取数据
    const x = parseInt(element.dataset.x) || 15;
    const y = parseInt(element.dataset.y) || 15;
    const gridWidth = parseInt(element.dataset.gridWidth) || 8;
    const gridHeight = parseInt(element.dataset.gridHeight) || 4;
    const moduleType = element.dataset.moduleType || 'unknown';
    const moduleData = moduleElements.find(m => m.id === element.id);

    if (moduleData) {
        // 更新当前模块数据
        currentModuleData.id = moduleData.id;
        currentModuleData.name = moduleData.name;
        currentModuleData.type = moduleData.type;
        currentModuleData.enabled = moduleData.enabled;
        currentModuleData.width = gridWidth;
        currentModuleData.height = gridHeight;
        currentModuleData.x = moduleData.x;
        currentModuleData.y = moduleData.y;
        currentModuleData.textSize = moduleData.textSize || 24;
        currentModuleData.textColor = moduleData.textColor || "#000000";
        currentModuleData.dateFormat = moduleData.dateFormat || "MM/dd";
        currentModuleData.zIndex = moduleData.zIndex;

        // 更新UI
        document.getElementById('moduleNameDisplay').textContent = currentModuleData.name;
        document.getElementById('moduleTypeDisplay').textContent =
            moduleType === 'clock' ? '时钟' :
                moduleType === 'weather' ? '天气' :
                    moduleType === 'calendar' ? '日历' :
                        moduleType === 'week' ? '星期' :
                            moduleType === 'battery' ? '电池' :
                                moduleType === 'countdown' ? '倒计时' :
                                    moduleType === 'memory' ? '内存' :
                                        moduleType === 'today-length' ? '今日已过去' : '未知';
        document.getElementById('moduleWidth').value = currentModuleData.width;
        document.getElementById('moduleHeight').value = currentModuleData.height;
        document.getElementById('moduleTextSize').value = currentModuleData.textSize;
        document.getElementById('moduleTextColor').value = currentModuleData.textColor;
        document.getElementById('moduleX').value = currentModuleData.x;
        document.getElementById('moduleY').value = currentModuleData.y;

        // 如果是日历模块，显示日期格式选择
        const dateFormatRow = document.getElementById('dateFormatRow');
        const dateFormatSelect = document.getElementById('moduleDateFormat');
        if (moduleType === 'calendar') {
            dateFormatRow.style.display = 'flex';
            dateFormatSelect.value = currentModuleData.dateFormat;
        } else {
            dateFormatRow.style.display = 'none';
        }

        // 如果是星期模块，显示星期格式选择
        const weekFormatRow = document.getElementById('weekFormatRow');
        const weekFormatSelect = document.getElementById('moduleWeekFormat');
        if (moduleType === 'week') {
            weekFormatRow.style.display = 'flex';
            weekFormatSelect.value = currentModuleData.weekFormat;
        } else {
            weekFormatRow.style.display = 'none';
        }

        // 更新对齐按钮状态
        updateAlignmentButtons('module', moduleData.hAlign, moduleData.vAlign);
    }
}

// 更新指针时钟属性面板
function updateAnalogClockPropertiesPanel(element) {
    if (!element) return;

    const x = parseInt(element.dataset.x) || 2;
    const y = parseInt(element.dataset.y) || 2;
    const gridWidth = parseInt(element.dataset.gridWidth) || 25;
    const gridHeight = parseInt(element.dataset.gridHeight) || 25;
    const clockData = analogClockElements.find(c => c.id === element.id);

    if (clockData) {
        currentAnalogClockData.id = clockData.id;
        currentAnalogClockData.name = clockData.name;
        currentAnalogClockData.enabled = clockData.enabled;
        currentAnalogClockData.width = gridWidth;
        currentAnalogClockData.height = gridHeight;
        currentAnalogClockData.x = clockData.x;
        currentAnalogClockData.y = clockData.y;
        currentAnalogClockData.zIndex = clockData.zIndex || 10;
        currentAnalogClockData.dialImage = clockData.dialImage;
        currentAnalogClockData.hourImage = clockData.hourImage;
        currentAnalogClockData.minuteImage = clockData.minuteImage;
        currentAnalogClockData.secondImage = clockData.secondImage;
        currentAnalogClockData.dialDataUrl = clockData.dialDataUrl;
        currentAnalogClockData.hourDataUrl = clockData.hourDataUrl;
        currentAnalogClockData.minuteDataUrl = clockData.minuteDataUrl;
        currentAnalogClockData.secondDataUrl = clockData.secondDataUrl;

        // 更新UI
        const nameDisplay = document.getElementById('analogClockNameDisplay');
        if (nameDisplay) nameDisplay.textContent = currentAnalogClockData.name;

        const widthInput = document.getElementById('analogClockWidth');
        if (widthInput) widthInput.value = currentAnalogClockData.width;

        const heightInput = document.getElementById('analogClockHeight');
        if (heightInput) heightInput.value = currentAnalogClockData.height;

        const xInput = document.getElementById('analogClockX');
        if (xInput) xInput.value = currentAnalogClockData.x;

        const yInput = document.getElementById('analogClockY');
        if (yInput) yInput.value = currentAnalogClockData.y;
    }
}

// 更新指针时钟元素中的图片
function updateClockImageInElement(element, part, imageSrc) {
    const imgId = `clock_${part}_${element.id}`;
    const imgElement = element.querySelector(`#${imgId}`);
    if (imgElement) {
        imgElement.src = imageSrc;
    }
}

// 设置时钟图片上传功能
function setupClockImageUpload(inputId, previewId, type) {
    const input = document.getElementById(inputId);
    const previewImg = document.getElementById(previewId);

    if (!input || !previewImg) return;

    input.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const dataUrl = e.target.result;

                // 更新预览图
                previewImg.src = dataUrl;

                // 更新当前选中的时钟元素
                if (selectedElement && selectedElement.dataset.type === 'analog-clock') {
                    const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
                    if (clockData) {
                        // 保存base64数据
                        clockData[`${type}DataUrl`] = dataUrl;

                        // 保存到当前选中的时钟数据
                        if (currentAnalogClockData.id === clockData.id) {
                            currentAnalogClockData[`${type}DataUrl`] = dataUrl;
                        }

                        // 更新时钟元素中的图片
                        updateClockImageInElement(clockData.element, type, dataUrl);

                        // 更新widgetData
                        updateWidgetDataViews();
                    }
                }
            };

            reader.readAsDataURL(file);
            this.value = '';
        }
    });
}

// 重置时钟图片为默认
async function resetClockImages() {
    if (!selectedElement || selectedElement.dataset.type !== 'analog-clock') return;

    const clockData = analogClockElements.find(c => c.id === currentAnalogClockData.id);
    if (!clockData) return;

    // 重置为默认图片
    clockData.dialImage = defaultClockImages.dial;
    clockData.hourImage = defaultClockImages.hour;
    clockData.minuteImage = defaultClockImages.minute;
    clockData.secondImage = defaultClockImages.second;

    // 清除自定义的DataURL
    clockData.dialDataUrl = null;
    clockData.hourDataUrl = null;
    clockData.minuteDataUrl = null;
    clockData.secondDataUrl = null;

    // 更新当前选中数据
    currentAnalogClockData.dialImage = defaultClockImages.dial;
    currentAnalogClockData.hourImage = defaultClockImages.hour;
    currentAnalogClockData.minuteImage = defaultClockImages.minute;
    currentAnalogClockData.secondImage = defaultClockImages.second;
    currentAnalogClockData.dialDataUrl = null;
    currentAnalogClockData.hourDataUrl = null;
    currentAnalogClockData.minuteDataUrl = null;
    currentAnalogClockData.secondDataUrl = null;

    // 更新元素中的图片
    updateClockImageInElement(selectedElement, 'dial', defaultClockImages.dial);
    updateClockImageInElement(selectedElement, 'hour', defaultClockImages.hour);
    updateClockImageInElement(selectedElement, 'minute', defaultClockImages.minute);
    updateClockImageInElement(selectedElement, 'second', defaultClockImages.second);

    // 更新预览图片
    document.getElementById('analogClockDialImg').src = defaultClockImages.dial;
    document.getElementById('analogClockHourImg').src = defaultClockImages.hour;
    document.getElementById('analogClockMinuteImg').src = defaultClockImages.minute;
    document.getElementById('analogClockSecondImg').src = defaultClockImages.second;

    // 更新widgetData
    updateWidgetDataViews();
}

// 更新指针时钟元素中的图片
function updateClockImageInElement(element, part, imageSrc) {
    if (!element) return;

    // 查找对应的图片元素
    let imgElement = null;

    // 根据类型查找对应的图片元素
    switch (part) {
        case 'dial':
            imgElement = element.querySelector('[id^="clock_dial_"]');
            break;
        case 'hour':
            imgElement = element.querySelector('[id^="clock_hour_"]');
            break;
        case 'minute':
            imgElement = element.querySelector('[id^="clock_minute_"]');
            break;
        case 'second':
            imgElement = element.querySelector('[id^="clock_second_"]');
            break;
    }

    // 如果没找到，尝试更通用的查找方式
    if (!imgElement) {
        // 获取时钟容器中的所有img元素
        const imgs = element.querySelectorAll('img');
        // 假设顺序是：表盘、时针、分针、秒针
        const indexMap = { dial: 0, hour: 1, minute: 2, second: 3 };
        if (imgs.length > indexMap[part]) {
            imgElement = imgs[indexMap[part]];
        }
    }

    if (imgElement) {
        imgElement.src = imageSrc;
        console.log(`成功更新时钟${part}图片:`, imageSrc);
    } else {
        console.warn(`未找到时钟${part}图片元素`);
    }
}


// 更新天气图标属性面板
function updateWeatherIconPropertiesPanel(element) {
    if (!element) return;

    const x = parseInt(element.dataset.x) || 15;
    const y = parseInt(element.dataset.y) || 15;
    const gridWidth = parseInt(element.dataset.gridWidth) || 5;
    const gridHeight = parseInt(element.dataset.gridHeight) || 5;
    const weatherIconData = weatherIconElements.find(w => w.id === element.id);

    if (weatherIconData) {
        currentWeatherIconData.id = weatherIconData.id;
        currentWeatherIconData.name = weatherIconData.name;
        currentWeatherIconData.enabled = weatherIconData.enabled;
        currentWeatherIconData.width = gridWidth;
        currentWeatherIconData.height = gridHeight;
        currentWeatherIconData.x = weatherIconData.x;
        currentWeatherIconData.y = weatherIconData.y;
        currentWeatherIconData.rotation = weatherIconData.rotation || 0;
        currentWeatherIconData.opacity = weatherIconData.opacity || 100;
        currentWeatherIconData.zIndex = weatherIconData.zIndex || 10;
        currentWeatherIconData.imageUrl = weatherIconData.imageUrl || './resources/weather.png';

        // 更新UI
        const nameDisplay = document.getElementById('weatherIconNameDisplay');
        if (nameDisplay) nameDisplay.textContent = currentWeatherIconData.name;

        const widthInput = document.getElementById('weatherIconWidth');
        if (widthInput) widthInput.value = currentWeatherIconData.width;

        const heightInput = document.getElementById('weatherIconHeight');
        if (heightInput) heightInput.value = currentWeatherIconData.height;

        const xInput = document.getElementById('weatherIconX');
        if (xInput) xInput.value = currentWeatherIconData.x;

        const yInput = document.getElementById('weatherIconY');
        if (yInput) yInput.value = currentWeatherIconData.y;
    }
}

// 更新温度属性面板
function updateTemperaturePropertiesPanel(element) {
    if (!element) return;

    const x = parseInt(element.dataset.x) || 15;
    const y = parseInt(element.dataset.y) || 15;
    const gridWidth = parseInt(element.dataset.gridWidth) || 8;
    const gridHeight = parseInt(element.dataset.gridHeight) || 4;
    const temperatureData = temperatureElements.find(t => t.id === element.id);

    if (temperatureData) {
        currentTemperatureData.id = temperatureData.id;
        currentTemperatureData.name = temperatureData.name;
        currentTemperatureData.enabled = temperatureData.enabled;
        currentTemperatureData.width = gridWidth;
        currentTemperatureData.height = gridHeight;
        currentTemperatureData.x = temperatureData.x;
        currentTemperatureData.y = temperatureData.y;
        currentTemperatureData.textSize = temperatureData.textSize || 3;
        currentTemperatureData.textColor = temperatureData.textColor || "#000000";
        currentTemperatureData.content = temperatureData.content || "N/A";
        currentTemperatureData.zIndex = temperatureData.zIndex || 10;
        currentTemperatureData.hAlign = temperatureData.hAlign || "center";
        currentTemperatureData.vAlign = temperatureData.vAlign || "center";

        // 更新UI
        const nameDisplay = document.getElementById('temperatureNameDisplay');
        if (nameDisplay) nameDisplay.textContent = currentTemperatureData.name;

        const widthInput = document.getElementById('temperatureWidth');
        if (widthInput) widthInput.value = currentTemperatureData.width;

        const heightInput = document.getElementById('temperatureHeight');
        if (heightInput) heightInput.value = currentTemperatureData.height;

        const xInput = document.getElementById('temperatureX');
        if (xInput) xInput.value = currentTemperatureData.x;

        const yInput = document.getElementById('temperatureY');
        if (yInput) yInput.value = currentTemperatureData.y;

        const sizeInput = document.getElementById('temperatureTextSize');
        if (sizeInput) sizeInput.value = currentTemperatureData.textSize;

        const colorInput = document.getElementById('temperatureTextColor');
        if (colorInput) colorInput.value = currentTemperatureData.textColor;

        const contentInput = document.getElementById('temperatureContent');
        if (contentInput) contentInput.value = currentTemperatureData.content;

        // 更新对齐按钮状态
        updateAlignmentButtons('temperature', temperatureData.hAlign, temperatureData.vAlign);
    }
}

// 更新对齐按钮状态
function updateAlignmentButtons(panelType, hAlign, vAlign) {
    // 获取对应的面板
    const panel = document.getElementById(`${panelType}Panel`);

    // 更新水平对齐按钮
    panel.querySelectorAll('.alignment-btn[data-align="horizontal"]').forEach(btn => {
        if (btn.dataset.value === hAlign) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 更新垂直对齐按钮
    panel.querySelectorAll('.alignment-btn[data-align="vertical"]').forEach(btn => {
        if (btn.dataset.value === vAlign) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 应用元素位置（使用格子数）
function applyElementPosition(element, x, y) {
    // 将格子数转换为百分比
    const gridSize = getGridSize();
    const percentX = (x / gridSize.x) * 100;
    const percentY = (y / gridSize.y) * 100;

    element.style.left = `${percentX}%`;
    element.style.top = `${percentY}%`;
    element.dataset.x = x;
    element.dataset.y = y;
}

// 添加尺寸控制点到元素
function addResizeHandles(element, type) {
    // 移除已有的控制点
    removeResizeHandles(element);

    // 八个控制点位置
    const handles = ['top-left', 'top-center', 'top-right', 'middle-right',
        'bottom-right', 'bottom-center', 'bottom-left', 'middle-left'];

    handles.forEach(handle => {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = `resize-handle ${handle}`;
        element.appendChild(resizeHandle);

        // 添加拖拽事件
        makeResizeHandleDraggable(resizeHandle, element, handle, type);
    });
}

// 移除尺寸控制点
function removeResizeHandles(element) {
    const handles = element.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
        handle.remove();
    });
}

// 使控制点可拖拽以调整尺寸
function makeResizeHandleDraggable(handle, element, handleType, elementType) {
    let isResizing = false;
    let startX, startY;
    let startWidth, startHeight;
    let startLeft, startTop;

    handle.addEventListener('mousedown', startResize);
    handle.addEventListener('touchstart', startResizeTouch);

    function startResize(e) {
        e.stopPropagation();
        isResizing = true;

        // 记录初始状态
        startX = e.clientX;
        startY = e.clientY;
        startWidth = element.offsetWidth;
        startHeight = element.offsetHeight;

        // 获取元素当前位置
        const computedStyle = window.getComputedStyle(element);
        startLeft = parseFloat(computedStyle.left);
        startTop = parseFloat(computedStyle.top);

        // 添加事件监听器
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        e.preventDefault();
    }

    function startResizeTouch(e) {
        if (e.touches.length !== 1) return;

        e.stopPropagation();
        isResizing = true;

        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startWidth = element.offsetWidth;
        startHeight = element.offsetHeight;

        const computedStyle = window.getComputedStyle(element);
        startLeft = parseFloat(computedStyle.left);
        startTop = parseFloat(computedStyle.top);

        document.addEventListener('touchmove', resizeTouch);
        document.addEventListener('touchend', stopResizeTouch);

        e.preventDefault();
    }

    function resize(e) {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        applyResize(deltaX, deltaY);

        e.preventDefault();
    }

    function resizeTouch(e) {
        if (!isResizing || e.touches.length !== 1) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        applyResize(deltaX, deltaY);

        e.preventDefault();
    }

    function applyResize(deltaX, deltaY) {
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        // 根据控制点类型调整尺寸和位置
        switch (handleType) {
            case 'top-left':
                newWidth = Math.max(10, startWidth - deltaX);
                newHeight = Math.max(10, startHeight - deltaY);
                newLeft = startLeft + deltaX;
                newTop = startTop + deltaY;
                break;
            case 'top-center':
                newHeight = Math.max(10, startHeight - deltaY);
                newTop = startTop + deltaY;
                break;
            case 'top-right':
                newWidth = Math.max(10, startWidth + deltaX);
                newHeight = Math.max(10, startHeight - deltaY);
                newTop = startTop + deltaY;
                break;
            case 'middle-right':
                newWidth = Math.max(10, startWidth + deltaX);
                break;
            case 'bottom-right':
                newWidth = Math.max(10, startWidth + deltaX);
                newHeight = Math.max(10, startHeight + deltaY);
                break;
            case 'bottom-center':
                newHeight = Math.max(10, startHeight + deltaY);
                break;
            case 'bottom-left':
                newWidth = Math.max(10, startWidth - deltaX);
                newHeight = Math.max(10, startHeight + deltaY);
                newLeft = startLeft + deltaX;
                break;
            case 'middle-left':
                newWidth = Math.max(10, startWidth - deltaX);
                newLeft = startLeft + deltaX;
                break;
        }

        // 转换为格子数（向上取整）
        const newGridSize = pxToGrid(newWidth, newHeight);

        // 限制最小格子数为1
        const gridWidth = Math.max(1, newGridSize.gridWidth);
        const gridHeight = Math.max(1, newGridSize.gridHeight);

        // 根据格子数重新计算像素尺寸
        const pixelSize = gridToPx(gridWidth, gridHeight);

        // 应用新尺寸
        element.style.width = pixelSize.pxWidth + 'px';
        element.style.height = pixelSize.pxHeight + 'px';

        // 保存格子数
        element.dataset.gridWidth = pixelSize.gridWidth;
        element.dataset.gridHeight = pixelSize.gridHeight;

        // 应用新位置（如果需要）
        if (newLeft !== startLeft) element.style.left = newLeft + 'px';
        if (newTop !== startTop) element.style.top = newTop + 'px';

        // 更新属性面板
        if (selectedElement === element) {
            if (elementType === 'material') {
                updateMaterialPropertiesPanel(element);
            } else if (elementType === 'text') {
                // 对于文字元素，只更新尺寸，不调整字体大小
                const textData = textElements.find(t => t.id === element.id);
                if (textData) {
                    textData.width = pixelSize.gridWidth;
                    textData.height = pixelSize.gridHeight;
                    updateTextPropertiesPanel(element);
                }
            } else if (elementType === 'shape') {
                const shapeData = shapeElements.find(s => s.id === element.id);
                if (shapeData) {
                    shapeData.width = pixelSize.gridWidth;
                    shapeData.height = pixelSize.gridHeight;
                    updateShapePropertiesPanel(element);
                }
            } else if (elementType === 'module') {
                const moduleData = moduleElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.width = pixelSize.gridWidth;
                    moduleData.height = pixelSize.gridHeight;
                    updateModulePropertiesPanel(element);
                }
            } else if (elementType === 'widget') {
                // 更新widget尺寸数据
                if (newWidth === 624 && newHeight === 300) {
                    widgetData.span_x = 4;
                    widgetData.span_y = 2;
                    document.getElementById('widgetSize').value = '4x2';
                    document.querySelector('.template-4x2').classList.add('selected');
                    document.querySelector('.template-2x2').classList.remove('selected');
                } else if (newWidth === 300 && newHeight === 300) {
                    widgetData.span_x = 2;
                    widgetData.span_y = 2;
                    document.getElementById('widgetSize').value = '2x2';
                    document.querySelector('.template-4x2').classList.remove('selected');
                    document.querySelector('.template-2x2').classList.add('selected');
                }

                // 更新辅助线
                updateGuideLines();
            }
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);

        // 更新widgetData
        updateWidgetDataViews();
    }

    function stopResizeTouch() {
        isResizing = false;
        document.removeEventListener('touchmove', resizeTouch);
        document.removeEventListener('touchend', stopResizeTouch);

        // 更新widgetData
        updateWidgetDataViews();
    }
}

// 更新widgetData中的views
function updateWidgetDataViews() {
    widgetData.layer = [];// 清空所有layer
    const gridSize = getGridSize(); // 获取模版尺寸

    widgetData.layer.push({
        type: "custom_widget",
        position: {
            x: 0,
            y: 0,
            width: gridSize.x,
            height: gridSize.y
        },
        views: []
    });

    // 创建自定义文本时钟layer（用于clock、calendar、week模块）
    let customTextClockLayer = null;

    // 添加背景
    if (currentBackgroundImage) {
        // 如果有背景图片
        widgetData.layer[0].views.push({
            view_type: "ShapeImageView",
            bg: "background.png",
            position: {
                x: 0,
                y: 0,
                width: gridSize.x,
                height: gridSize.y
            }
        });
    } else {
        // 如果没有背景图片，使用颜色背景
        let bgColor = "#FFFFFF"; // 默认白色

        // 获取当前widget的背景颜色
        const computedStyle = window.getComputedStyle(widgetContainer);
        const widgetBgColor = computedStyle.backgroundColor ||
            computedStyle.background ||
            document.getElementById('widgetBgColor').value;

        // 如果是渐变背景，取第一个颜色或使用默认白色
        if (currentGradient) {
            // 如果是渐变背景，使用默认白色或取第一个颜色
            if (gradientStops.length > 0) {
                bgColor = gradientStops[0].color;
            }
        } else if (widgetBgColor && widgetBgColor !== 'transparent' && widgetBgColor !== 'rgba(0, 0, 0, 0)') {
            // 如果不是透明色，则使用widget的背景颜色
            bgColor = widgetBgColor;

            // 如果是rgb/rgba格式，转换为hex
            if (bgColor.startsWith('rgb')) {
                // 从rgb或rgba中提取数值
                const rgb = bgColor.match(/\d+/g);
                if (rgb && rgb.length >= 3) {
                    const r = parseInt(rgb[0]);
                    const g = parseInt(rgb[1]);
                    const b = parseInt(rgb[2]);
                    bgColor = rgbToHex(r, g, b);
                }
            }
        }

        // 添加颜色背景视图
        widgetData.layer[0].views.push({
            view_type: "ImageView",
            bg: bgColor, // 使用颜色值
            position: {
                x: 0,
                y: 0,
                width: gridSize.x,
                height: gridSize.y
            }
        });
    }

    // 添加所有素材视图
    uploadedMaterials.forEach(material => {
        if (material.element) {
            const element = material.element;
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            const width = parseInt(element.dataset.gridWidth) || 5;
            const height = parseInt(element.dataset.gridHeight) || 5;

            widgetData.layer[0].views.push({
                view_type: "ImageView",
                bg: material.name,
                position: {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                }
            });
        }
    });

    let index = 1;
    // 添加所有形状视图
    shapeElements.forEach(shape => {
        if (shape.element) {
            const element = shape.element;
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            const width = parseInt(element.dataset.gridWidth) || 5;
            const height = parseInt(element.dataset.gridHeight) || 5;
            // 生成SVG文件名
            const svgFileName = `shape_${index}.svg`;

            const shapeView = {
                view_type: "ShapeableImageView",
                svg: svgFileName,
                color: shape.color,
                position: {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                }
            };

            // 添加渐变属性
            if (shape.gradient) {
                shapeView.gradient = {
                    type: shape.gradientType || 'linear',
                    stops: shape.gradientStops || []
                };
            }

            widgetData.layer[0].views.push(shapeView);
            index++;
        }
    });

    // 添加所有模块视图
    moduleElements.forEach(module => {
        if (module.element) {
            const element = module.element;
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            const width = parseInt(element.dataset.gridWidth) || 8;
            const height = parseInt(element.dataset.gridHeight) || 4;

            // 根据模块类型创建不同的视图
            // 检查是否为需要合并到custom_text_clock_1 layer的模块
            if (module.type === 'clock' || module.type === 'calendar' || module.type === 'week') {
                // 如果还没有创建custom_text_clock_1 layer，则创建
                if (!customTextClockLayer) {
                    customTextClockLayer = {
                        type: "custom_text_clock_1",
                        position: {
                            x: 0,
                            y: 0,
                            width: gridSize.x,
                            height: gridSize.y
                        },
                        views: []
                    };
                }
                
                // 根据模块类型创建不同的视图
                if (module.type === 'clock') {
                    customTextClockLayer.views.push({
                        view_type: "TextClock",
                        text: "HH:mm",
                        text_size: module.textSize || 3,
                        text_color: module.textColor || "#000000",
                        role_color: "on_surface",
                        text_font: "Birthstone-Regular.ttf",
                        position: {
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        }
                    });
                } else if (module.type === 'calendar') {
                    customTextClockLayer.views.push({
                        view_type: "TextClock",
                        text: module.dateFormat || "MMM dd",
                        text_color: module.textColor || "#000000",
                        text_size: module.textSize || 3,
                        role_color: module.role_color || "on_surface",
                        position: {
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        }
                    });
                } else if (module.type === 'week') {
                    customTextClockLayer.views.push({
                        view_type: "TextView",
                        text: module.weekFormat || "MMMM dd'th', 'week'",
                        text_color: module.textColor || "#000000",
                        text_size: module.textSize || 3,
                        role_color: module.role_color || "on_surface",
                        position: {
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        }
                    });
                }
            } else if (module.type === 'battery') {
                widgetData.layer.push({
                    type: "battery_widget_1",
                    position: {
                        x: 0,
                        y: 0,
                        width: gridSize.x,
                        height: gridSize.y
                    },
                    views: [{
                        view_type: "TextView",
                        text: "battery_level",
                        text_color: module.textColor || "#000000",
                        text_size: module.textSize || 3,
                        position: {
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        }
                    }]
                });
            } else if (module.type === 'countdown') {
                widgetData.layer.push({
                    type: "countdown_widget_1",
                    position: {
                        x: 0,
                        y: 0,
                        width: gridSize.x,
                        height: gridSize.y
                    },
                    views: [{
                        view_type: "TextView",
                        text: "countdown_new_year",
                        text_color: module.textColor || "#000000",
                        text_size: module.textSize || 3,
                        position: {
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        }
                    }]
                });
            } else if (module.type === 'memory') {
                widgetData.layer[0].views.push({
                    view_type: "TextView",
                    text: "ram_size",
                    text_color: module.textColor || "#000000",
                    text_size: module.textSize || 3,
                    position: {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    }
                });
            } else if (module.type === 'today-length') {
                widgetData.layer[0].views.push({
                    view_type: "TextView",
                    text: "today_length",
                    text_color: module.textColor || "#000000",
                    text_size: module.textSize || 3,
                    position: {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    }
                });
            }
        }
    });

    // 如果存在custom_text_clock_1 layer，则添加到widgetData.layer中
    if (customTextClockLayer) {
        widgetData.layer.push(customTextClockLayer);
    }

    // 添加所有指针时钟视图
    analogClockElements.forEach(clock => {
        if (clock.element) {
            const element = clock.element;
            const x = parseInt(element.dataset.x) || 2;
            const y = parseInt(element.dataset.y) || 2;
            const width = parseInt(element.dataset.gridWidth) || 25;
            const height = parseInt(element.dataset.gridHeight) || 25;

            widgetData.layer.push({
                type: "analog_clock_1",
                position: {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                },
                views: [{
                    view_id: "dial_1",
                    bg: "clock_1_dial.png",
                }, {
                    view_id: "hour_1",
                    bg: "clock_1_hour.png",
                }, {
                    view_id: "minute_1",
                    bg: "clock_1_minute.png",
                }, {
                    view_id: "second_1",
                    bg: "clock_1_second.png",
                }]
            });
        }
    });

    // 将天气图标和温度文本组合成独立的天气模块层
    weatherIconElements.forEach((weatherIcon, index) => {
        if (weatherIcon.element) {
            const element = weatherIcon.element;
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            const width = parseInt(element.dataset.gridWidth) || 5;
            const height = parseInt(element.dataset.gridHeight) || 5;

            // 查找对应的温度文本（如果有）
            const temperature = temperatureElements[index];

            // 创建天气模块层
            const weatherLayer = {
                type: "weather_widget_1",
                position: {
                    x: 0,
                    y: 0,
                    width: gridSize.x,
                    height: gridSize.y
                },
                views: []
            };

            // 添加天气图标视图
            weatherLayer.views.push({
                view_id: "digital_clock_weather",
                view_type: "ImageView",
                position: {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                }
            });

            // 如果有对应的温度文本，添加到同一个层
            if (temperature && temperature.element) {
                const tempElement = temperature.element;
                const tempX = parseInt(tempElement.dataset.x) || 0;
                const tempY = parseInt(tempElement.dataset.y) || 0;
                const tempWidth = parseInt(tempElement.dataset.gridWidth) || 8;
                const tempHeight = parseInt(tempElement.dataset.gridHeight) || 4;

                weatherLayer.views.push({
                    view_id: "digital_clock_temperature",
                    view_type: "TextView",
                    text: "N/A",
                    text_color: temperature.textColor || "#000000",
                    text_size: temperature.textSize || 3,
                    role_color: "on_surface",
                    position: {
                        x: tempX,
                        y: tempY,
                        width: tempWidth,
                        height: tempHeight
                    }
                });
            }

            // 将天气模块层添加到widgetData中
            widgetData.layer.push(weatherLayer);
        }
    });

    // 单独处理没有对应天气图标的温度文本
    temperatureElements.forEach((temperature, index) => {
        // 跳过已经有对应天气图标的温度文本
        if (index < weatherIconElements.length) return;

        if (temperature && temperature.element) {
            const tempElement = temperature.element;
            const tempX = parseInt(tempElement.dataset.x) || 0;
            const tempY = parseInt(tempElement.dataset.y) || 0;
            const tempWidth = parseInt(tempElement.dataset.gridWidth) || 8;
            const tempHeight = parseInt(tempElement.dataset.gridHeight) || 4;

            // 创建独立的温度模块层
            const temperatureLayer = {
                type: "weather_widget_1",
                position: {
                    x: 0,
                    y: 0,
                    width: gridSize.x,
                    height: gridSize.y
                },
                views: [
                    {
                        view_id: "digital_clock_temperature",
                        view_type: "TextView",
                        text: "N/A",
                        text_color: temperature.textColor || "#000000",
                        text_size: temperature.textSize || 3,
                        role_color: "on_surface",
                        position: {
                            x: tempX,
                            y: tempY,
                            width: tempWidth,
                            height: tempHeight
                        }
                    }
                ]
            };

            // 将温度模块层添加到widgetData中
            widgetData.layer.push(temperatureLayer);
        }
    });

    // 添加所有文字视图
    textElements.forEach(text => {
        if (text.element) {
            const element = text.element;
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            const width = parseInt(element.dataset.gridWidth) || 8;
            const height = parseInt(element.dataset.gridHeight) || 4;

            widgetData.layer[0].views.push({
                view_type: "TextView",
                text: text.content || "示例文字",
                text_color: text.color || "#000000",
                text_size: text.size || 3,
                position: {
                    x: x,
                    y: y,
                    width: width,
                    height: height
                }
            });
        }
    });
}

// 切换属性面板
function switchPropertyPanel(panelType) {
    // 隐藏所有面板
    document.querySelectorAll('.property-panel').forEach(panel => {
        panel.style.display = 'none';
    });

    // 显示目标面板
    const targetPanel = document.getElementById(`${panelType}Panel`);
    if (targetPanel) {
        targetPanel.style.display = 'block';
    }
}

// 更新Widget尺寸
function updateWidgetSize(templateType) {
    if (templateType === '4x2') {
        widgetContainer.style.width = '624px';
        widgetContainer.style.height = '300px';
        widgetData.span_x = 4;
        widgetData.span_y = 2;
    } else {
        widgetContainer.style.width = '300px';
        widgetContainer.style.height = '300px';
        widgetData.span_x = 2;
        widgetData.span_y = 2;
    }

    // 更新选择器
    document.getElementById('widgetSize').value = `${widgetData.span_x}x${widgetData.span_y}`;

    // 更新widgetData中的position
    const gridSize = getGridSize();
    widgetData.layer[0].position.width = gridSize.x;
    widgetData.layer[0].position.height = gridSize.y;

    // 重置widget位置到预览区域中心
    resetWidgetPosition();

    // 重新初始化拖拽 - 重新绑定widget容器的拖拽
    makeWidgetDraggable();

    // 为widget重新添加尺寸控制点
    removeResizeHandles(widgetContainer);
    addResizeHandles(widgetContainer, 'widget');

    // 重新绑定所有已存在元素的拖拽和缩放功能
    reinitializeAllElements();

    // 更新辅助线
    updateGuideLines();

    // 重新应用所有元素的位置
    document.querySelectorAll('.draggable-element, .text-element, .shape-element, .module-element').forEach(element => {
        const x = parseInt(element.dataset.x) || 0;
        const y = parseInt(element.dataset.y) || 0;
        applyElementPosition(element, x, y);
    });

    // 重新应用所有文字和模块的样式,以重新计算字号
    textElements.forEach(text => {
        if (text.element) {
            applyTextStyle(text.element, text);
        }
    });

    moduleElements.forEach(module => {
        if (module.element) {
            applyModuleStyle(module.element, module);
        }
    });
}

// 重新初始化所有元素的拖拽和缩放功能
function reinitializeAllElements() {
    // 清除所有元素的选中状态
    clearElementSelections();

    // 只重新选中当前选中的元素
    if (selectedElement) {
        // 根据元素类型重新添加尺寸控制点
        const elementType = selectedElement.dataset.type;

        // 移除旧的尺寸控制点
        removeResizeHandles(selectedElement);

        // 根据类型重新添加尺寸控制点
        if (elementType === 'material') {
            addResizeHandles(selectedElement, 'material');
            makeElementDraggable(selectedElement, 'material');
        } else if (elementType === 'text') {
            if (selectedElement.classList.contains('module-element')) {
                addResizeHandles(selectedElement, 'module');
                makeElementDraggable(selectedElement, 'module');
            } else {
                addResizeHandles(selectedElement, 'text');
                makeElementDraggable(selectedElement, 'text');
            }
        } else if (elementType === 'shape') {
            addResizeHandles(selectedElement, 'shape');
            makeElementDraggable(selectedElement, 'shape');
        } else if (elementType === 'analog-clock') {
            addResizeHandles(selectedElement, 'analog-clock');
            makeElementDraggable(selectedElement, 'analog-clock');
        } else if (elementType === 'weather-icon') {
            addResizeHandles(selectedElement, 'weather-icon');
            makeElementDraggable(selectedElement, 'weather-icon');
        } else if (elementType === 'temperature') {
            addResizeHandles(selectedElement, 'temperature');
            makeElementDraggable(selectedElement, 'temperature');
        } else if (selectedElement === widgetContainer) {
            // Widget本身
            addResizeHandles(selectedElement, 'widget');
            makeWidgetDraggable();
        }
    }
}

// 添加重置widget位置到预览区域中心的函数
function resetWidgetPosition() {
    // 移除绝对定位样式，让widget回到预览区域中心
    widgetContainer.style.left = '';
    widgetContainer.style.top = '';
    widgetContainer.style.transform = `translate(-50%, -50%) scale(${currentZoom / 100})`;
}

// 使Widget可拖拽
function makeWidgetDraggable() {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    widgetContainer.addEventListener('mousedown', startDrag);
    widgetContainer.addEventListener('touchstart', startDragTouch);

    function startDrag(e) {
        // 如果点击的是控制点，不触发拖拽
        if (e.target.classList.contains('resize-handle') ||
            e.target.closest('.resize-handle')) {
            return;
        }

        isDragging = true;

        const rect = widgetContainer.getBoundingClientRect();
        const areaRect = previewArea.getBoundingClientRect();

        // 计算初始位置
        initialX = rect.left - areaRect.left;
        initialY = rect.top - areaRect.top;

        // 计算鼠标相对于Widget的位置
        startX = e.clientX;
        startY = e.clientY;

        // 添加事件监听器
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        e.preventDefault();
    }

    function startDragTouch(e) {
        // 如果点击的是控制点，不触发拖拽
        if (e.target.classList.contains('resize-handle') ||
            e.target.closest('.resize-handle')) {
            return;
        }

        if (e.touches.length !== 1) return;

        isDragging = true;

        const rect = widgetContainer.getBoundingClientRect();
        const areaRect = previewArea.getBoundingClientRect();
        const touch = e.touches[0];

        // 计算初始位置
        initialX = rect.left - areaRect.left;
        initialY = rect.top - areaRect.top;

        // 计算触摸点相对于Widget的位置
        startX = touch.clientX;
        startY = touch.clientY;

        // 添加事件监听器
        document.addEventListener('touchmove', dragTouch);
        document.addEventListener('touchend', stopDragTouch);

        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        const areaRect = previewArea.getBoundingClientRect();

        // 计算新的位置
        let newX = initialX + (e.clientX - startX);
        let newY = initialY + (e.clientY - startY);

        // 限制在预览区域内
        newX = Math.max(0, Math.min(newX, areaRect.width - widgetContainer.offsetWidth));
        newY = Math.max(0, Math.min(newY, areaRect.height - widgetContainer.offsetHeight));

        // 应用新位置
        widgetContainer.style.left = newX + 'px';
        widgetContainer.style.top = newY + 'px';
        widgetContainer.style.transform = `translate(0, 0) scale(${currentZoom / 100})`;
    }

    function dragTouch(e) {
        if (!isDragging || e.touches.length !== 1) return;

        const areaRect = previewArea.getBoundingClientRect();
        const touch = e.touches[0];

        // 计算新的位置
        let newX = initialX + (touch.clientX - startX);
        let newY = initialY + (touch.clientY - startY);

        // 限制在预览区域内
        newX = Math.max(0, Math.min(newX, areaRect.width - widgetContainer.offsetWidth));
        newY = Math.max(0, Math.min(newY, areaRect.height - widgetContainer.offsetHeight));

        // 应用新位置
        widgetContainer.style.left = newX + 'px';
        widgetContainer.style.top = newY + 'px';
        widgetContainer.style.transform = `translate(0, 0) scale(${currentZoom / 100})`;

        e.preventDefault();
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }

    function stopDragTouch() {
        isDragging = false;
        document.removeEventListener('touchmove', dragTouch);
        document.removeEventListener('touchend', stopDragTouch);
    }
}

// 单个元素拖拽
function makeElementDraggable(element, type) {
    let isDragging = false;
    let startX, startY;
    let initialX, initialY;
    let gridX, gridY;

    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDragTouch);

    function startDrag(e) {
        // 如果点击的是控制点，不触发拖拽
        if (e.target.classList.contains('resize-handle') ||
            e.target.closest('.resize-handle')) {
            return;
        }

        isDragging = true;

        // 获取元素当前位置（网格坐标）
        gridX = parseInt(element.dataset.x) || 0;
        gridY = parseInt(element.dataset.y) || 0;

        // 计算鼠标相对于元素的位置（像素）
        const rect = element.getBoundingClientRect();
        const widgetRect = widgetContainer.getBoundingClientRect();

        // 直接记录鼠标起始位置
        startX = e.clientX;
        startY = e.clientY;

        // 计算元素在widget中的初始偏移
        initialX = (gridX / getGridSize().x) * widgetRect.width;
        initialY = (gridY / getGridSize().y) * widgetRect.height;

        // 添加事件监听器
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        e.stopPropagation();
        e.preventDefault();
    }

    function startDragTouch(e) {
        if (e.touches.length !== 1) return;

        // 如果点击的是控制点，不触发拖拽
        if (e.target.classList.contains('resize-handle') ||
            e.target.closest('.resize-handle')) {
            return;
        }

        isDragging = true;

        // 获取元素当前位置（网格坐标）
        gridX = parseInt(element.dataset.x) || 0;
        gridY = parseInt(element.dataset.y) || 0;

        const rect = element.getBoundingClientRect();
        const widgetRect = widgetContainer.getBoundingClientRect();
        const touch = e.touches[0];

        // 计算初始位置
        startX = touch.clientX;
        startY = touch.clientY;

        // 计算元素在widget中的初始偏移
        initialX = (gridX / getGridSize().x) * widgetRect.width;
        initialY = (gridY / getGridSize().y) * widgetRect.height;

        // 添加事件监听器
        document.addEventListener('touchmove', dragTouch);
        document.addEventListener('touchend', stopDragTouch);

        e.stopPropagation(); // 防止触发Widget拖拽
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        const widgetRect = widgetContainer.getBoundingClientRect();

        // 计算鼠标移动距离
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // 计算新位置（像素）
        let newX = initialX + deltaX;
        let newY = initialY + deltaY;

        // 限制在Widget容器内
        const maxX = widgetRect.width - (type === 'material' || type === 'module' || type === 'shape' || type === 'analog-clock' || type === 'weather-icon' || type === 'temperature' ? element.offsetWidth : element.scrollWidth);
        const maxY = widgetRect.height - (type === 'material' || type === 'module' || type === 'shape' || type === 'analog-clock' || type === 'weather-icon' || type === 'temperature' ? element.offsetHeight : element.scrollHeight);

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        // 转换为百分比
        const percentX = (newX / widgetRect.width) * 100;
        const percentY = (newY / widgetRect.height) * 100;

        // 转换为网格坐标
        const gridSize = getGridSize();
        gridX = Math.round((percentX / 100) * gridSize.x);
        gridY = Math.round((percentY / 100) * gridSize.y);

        // 确保在有效范围内
        gridX = Math.max(0, Math.min(gridSize.x, gridX));
        gridY = Math.max(0, Math.min(gridSize.y, gridY));

        // 立即应用位置（避免延迟）
        element.style.left = `${percentX}%`;
        element.style.top = `${percentY}%`;

        e.preventDefault();
    }

    function dragTouch(e) {
        if (!isDragging || e.touches.length !== 1) return;

        const widgetRect = widgetContainer.getBoundingClientRect();
        const touch = e.touches[0];

        // 计算新的位置（相对于Widget）
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        let newX = initialX + deltaX;
        let newY = initialY + deltaY;

        // 限制在Widget容器内
        const maxX = widgetRect.width - (type === 'material' || type === 'module' || type === 'shape' || type === 'analog-clock' || type === 'weather-icon' || type === 'temperature' ? element.offsetWidth : element.scrollWidth);
        const maxY = widgetRect.height - (type === 'material' || type === 'module' || type === 'shape' || type === 'analog-clock' || type === 'weather-icon' || type === 'temperature' ? element.offsetHeight : element.scrollHeight);

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        // 转换为百分比
        const percentX = (newX / widgetRect.width) * 100;
        const percentY = (newY / widgetRect.height) * 100;

        // 转换为格子数
        const gridSize = getGridSize();
        gridX = Math.round((percentX / 100) * gridSize.x);
        gridY = Math.round((percentY / 100) * gridSize.y);

        // 确保在有效范围内
        gridX = Math.max(0, Math.min(gridSize.x, gridX));
        gridY = Math.max(0, Math.min(gridSize.y, gridY));

        // 应用新位置
        element.style.left = `${percentX}%`;
        element.style.top = `${percentY}%`;

        e.preventDefault();
    }

    function stopDrag() {
        if (!isDragging) return;

        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);

        // 更新最终位置
        applyElementPosition(element, gridX, gridY);

        // 更新属性面板
        if (selectedElement === element) {
            if (type === 'material') {
                updateMaterialPropertiesPanel(element);
            } else if (type === 'text') {
                // 更新对应的text数据
                const textData = textElements.find(t => t.id === element.id);
                if (textData) {
                    textData.x = gridX;
                    textData.y = gridY;
                    updateTextPropertiesPanel(element);
                }
            } else if (type === 'shape') {
                // 更新对应的shape数据
                const shapeData = shapeElements.find(s => s.id === element.id);
                if (shapeData) {
                    shapeData.x = gridX;
                    shapeData.y = gridY;
                    updateShapePropertiesPanel(element);
                }
            } else if (type === 'module') {
                // 更新对应的module数据
                const moduleData = moduleElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateModulePropertiesPanel(element);
                }
            } else if (type === 'analog-clock') {
                // 更新对应的module数据
                const moduleData = analogClockElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateAnalogClockPropertiesPanel(element);
                }
            } else if (type === 'weather-icon') {
                // 更新对应的module数据
                const moduleData = weatherIconElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateWeatherIconPropertiesPanel(element);
                }
            } else if (type === 'temperature') {
                // 更新对应的module数据
                const moduleData = temperatureElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateTemperaturePropertiesPanel(element);
                }
            }
        }

        // 更新widgetData中的views
        updateWidgetDataViews();
    }

    function stopDragTouch() {
        if (!isDragging) return;

        isDragging = false;
        document.removeEventListener('touchmove', dragTouch);
        document.removeEventListener('touchend', stopDragTouch);

        // 更新最终位置
        applyElementPosition(element, gridX, gridY);

        // 更新属性面板
        if (selectedElement === element) {
            if (type === 'material') {
                updateMaterialPropertiesPanel(element);
            } else if (type === 'text') {
                const textData = textElements.find(t => t.id === element.id);
                if (textData) {
                    textData.x = gridX;
                    textData.y = gridY;
                    updateTextPropertiesPanel(element);
                }
            } else if (type === 'shape') {
                const shapeData = shapeElements.find(s => s.id === element.id);
                if (shapeData) {
                    shapeData.x = gridX;
                    shapeData.y = gridY;
                    updateShapePropertiesPanel(element);
                }
            } else if (type === 'module') {
                const moduleData = moduleElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateModulePropertiesPanel(element);
                }
            } else if (type === 'analog-clock') {
                const moduleData = analogClockElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateAnalogClockPropertiesPanel(element);
                }
            } else if (type === 'weather-icon') {
                const moduleData = weatherIconElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateWeatherIconPropertiesPanel(element);
                }
            } else if (type === 'temperature') {
                const moduleData = temperatureElements.find(m => m.id === element.id);
                if (moduleData) {
                    moduleData.x = gridX;
                    moduleData.y = gridY;
                    updateTemperaturePropertiesPanel(element);
                }
            }
        }

        // 更新widgetData中的views
        updateWidgetDataViews();
    }
}

// 缩放功能
function zoomIn() {
    if (currentZoom < 200) {
        currentZoom += 10;
        applyZoom();
        updateZoomDisplay();
    }
}

function zoomOut() {
    if (currentZoom > 10) {
        currentZoom -= 10;
        applyZoom();
        updateZoomDisplay();
    }
}

// 重置缩放
function resetZoom() {
    currentZoom = 100;
    widgetContainer.style.transform = `translate(-50%, -50%) scale(${currentZoom / 100})`;
    updateZoomDisplay();
}

// 恢复widget尺寸到当前模板的默认尺寸
function restoreWidgetSize() {
    const currentTemplate = getCurrentTemplate();
    updateWidgetSize(currentTemplate);

    // 更新模板选择器的选中状态
    document.querySelectorAll('.template').forEach(t => {
        t.classList.remove('selected');
    });
    const templateElement = document.querySelector(`.template-${currentTemplate}`);
    if (templateElement) {
        templateElement.classList.add('selected');
    }
}

// 获取当前模板类型
function getCurrentTemplate() {
    if (widgetData.span_x === 4 && widgetData.span_y === 2) {
        return '4x2';
    } else {
        return '2x2';
    }
}

function applyZoom() {
    const previewArea = document.getElementById('previewArea');
    const scale = currentZoom / 100;

    // 应用缩放
    widgetContainer.style.transform = `scale(${scale})`;

    // 确保widget在预览区域内可见
    if (previewArea) {
        const widgetRect = widgetContainer.getBoundingClientRect();
        const areaRect = previewArea.getBoundingClientRect();

        // 检查widget是否超出预览区域
        if (widgetRect.left < areaRect.left ||
            widgetRect.right > areaRect.right ||
            widgetRect.top < areaRect.top ||
            widgetRect.bottom > areaRect.bottom) {

            // 如果超出，则重置位置到中心
            resetWidgetPosition();
        }
    }
}

// 更新缩放显示
function updateZoomDisplay() {
    zoomLevel.textContent = `${currentZoom}%`;
}

// 新增一个辅助函数，用于将任意格式的图片转换为PNG
async function convertImageToPNG(dataUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');

            // 先填充白色背景（如果需要）
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制图片
            ctx.drawImage(img, 0, 0);

            // 转换为PNG格式的dataURL
            const pngDataUrl = canvas.toDataURL('image/png');
            const base64Data = pngDataUrl.split(',')[1];
            resolve(base64Data);
        };

        img.onerror = function () {
            reject(new Error('图片加载失败'));
        };

        img.src = dataUrl;
    });
}

// 生成导出ZIP包
async function generateExportZip() {
    try {
        // 1. 创建资源zip包(内层)
        const resourceZip = new JSZip();

        // 1.1 添加JSON配置文件(固定命名为layer_cfg.json)
        const jsonText = jsonOutput.textContent;
        resourceZip.file('layer_cfg.json', jsonText);

        // 1.2 添加背景图片(如果存在)
        if (currentBackgroundImage) {
            try {
                // 无论原始格式是什么，都转换为PNG格式
                const pngBase64Data = await convertImageToPNG(currentBackgroundImage);
                resourceZip.file('background.png', pngBase64Data, { base64: true });
            } catch (error) {
                console.error('背景图片转换PNG失败:', error);
                // 如果转换失败，尝试使用原始数据（但强制命名为png）
                const bgBase64Data = currentBackgroundImage.split(',')[1];
                resourceZip.file('background.png', bgBase64Data, { base64: true });
            }
        }

        // 1.3 添加所有导入的图片资源(保留原始文件名)
        for (const material of uploadedMaterials) {
            // 检查material是否有dataUrl属性
            if (material.dataUrl) {
                // 将base64数据转换为二进制
                // material.dataUrl格式: "data:image/png;base64,iVBORw0KG..."
                const base64Data = material.dataUrl.split(',')[1];

                // 获取原始文件名，如果有file对象就用file.name，否则用material.name
                const fileName = material.file ? material.file.name : `${material.name}.png`;
                resourceZip.file(fileName, base64Data, { base64: true });
            }
        }

        // 1.4 添加所有指针时钟图片资源
        // 首先确保默认时钟图片已加载
        await loadDefaultClockImages();
        let clockImageCounter = 1;
        for (const clock of analogClockElements) {
            if (!clock.element) continue;

            // 处理四个时钟图片：表盘、时针、分针、秒针
            const clockParts = ['dial', 'hour', 'minute', 'second'];

            for (const part of clockParts) {
                let imageData = null;
                let extension = 'png';
                let imageName = `clock_${clockImageCounter}_${part}.${extension}`;

                // 优先使用用户上传的图片
                if (clock[`${part}DataUrl`]) {
                    const dataUrl = clock[`${part}DataUrl`];
                    if (dataUrl && dataUrl.startsWith('data:')) {
                        // 提取base64数据和文件类型
                        const matches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
                        if (matches && matches.length === 3) {
                            extension = matches[1] || 'png';
                            const base64Data = matches[2];
                            imageName = `clock_${clockImageCounter}_${part}.${extension}`;
                            imageData = base64Data;
                        }
                    }
                }
                // 如果没有用户上传的图片，使用默认图片
                else if (defaultClockImages[part]) {
                    // 默认图片已经是base64格式
                    const dataUrl = defaultClockImages[part];
                    if (dataUrl && dataUrl.startsWith('data:')) {
                        const matches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
                        if (matches && matches.length === 3) {
                            extension = matches[1] || 'png';
                            const base64Data = matches[2];
                            imageName = `clock_${clockImageCounter}_${part}.${extension}`;
                            imageData = base64Data;
                        }
                    } else {
                        // 如果默认图片不是base64格式，尝试重新加载
                        try {
                            const response = await fetch(dataUrl);
                            const blob = await response.blob();
                            const reader = new FileReader();

                            imageData = await new Promise((resolve) => {
                                reader.onload = function (e) {
                                    const base64Data = e.target.result.split(',')[1];
                                    resolve(base64Data);
                                };
                                reader.readAsDataURL(blob);
                            });
                        } catch (error) {
                            console.error(`加载默认${part}图片失败:`, error);
                        }
                    }
                }

                // 如果有图片数据，添加到ZIP包
                if (imageData) {
                    resourceZip.file(imageName, imageData, { base64: true });

                    // 更新widgetData中的图片引用为文件名
                    const clockLayer = widgetData.layer.find(layer =>
                        layer.type === "analog_clock_1" &&
                        layer.views &&
                        layer.views.some(view => view.view_id === `${part}_1`)
                    );

                    if (clockLayer && clockLayer.views) {
                        const targetView = clockLayer.views.find(view => view.view_id === `${part}_1`);
                        if (targetView) {
                            targetView.bg = imageName;
                        }
                    }
                }
            }
            clockImageCounter++;
        }

        // 1.5 添加所有SVG形状文件
        let shapeIndex = 1;
        for (const shape of shapeElements) {
            if (shape.element) {
                // 获取SVG元素
                const svgElement = shape.element.querySelector('svg');
                if (svgElement) {
                    // 克隆SVG元素以避免修改原始元素
                    const clonedSvg = svgElement.cloneNode(true);

                    // 确保SVG有明确的宽度和高度
                    const width = shape.width || 5;
                    const height = shape.height || 5;
                    clonedSvg.setAttribute('width', '100%');
                    clonedSvg.setAttribute('height', '100%');
                    clonedSvg.setAttribute('viewBox', '0 0 200 200');

                    // 转换为SVG字符串
                    const svgString = new XMLSerializer().serializeToString(clonedSvg);

                    // 创建SVG Blob
                    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

                    // 生成文件名
                    const shapeName = `shape_${shapeIndex}`;
                    const fileName = `${shapeName}.svg`;

                    // 添加到ZIP
                    resourceZip.file(fileName, svgBlob);

                    shapeIndex++;
                }
            }
        }

        // 1.6 生成资源zip的blob
        const resourceZipBlob = await resourceZip.generateAsync({ type: 'blob' });

        // 2. 创建根级zip包(外层)
        const rootZip = new JSZip();

        // 2.1 添加预览图
        const imageData = await generatePreviewImage();
        const imageExtension = configExportFormat === 'jpeg' ? 'jpg' : configExportFormat;
        rootZip.file(`${widgetData.name}_preview.${imageExtension}`, imageData, { binary: true });

        // 2.2 添加资源zip包
        rootZip.file(`${widgetData.name}.zip`, resourceZipBlob);

        // 3. 生成并下载根级ZIP文件
        const finalZipBlob = await rootZip.generateAsync({ type: 'blob' });
        saveAs(finalZipBlob, `${widgetData.name}.zip`);

    } catch (error) {
        console.error('生成ZIP包失败:', error);
        alert('导出失败: ' + error.message);
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 切换辅助线显示
    document.getElementById('toggleGuides').addEventListener('click', function () {
        guidesVisible = !guidesVisible;
        guideStatus.textContent = guidesVisible ? "显示" : "隐藏";

        if (guidesVisible) {
            guideLines.style.display = 'block';
            updateGuideLines(); // 重新生成网格线
        } else {
            guideLines.style.display = 'none';
        }
    });

    // 模板选择
    document.querySelectorAll('.template').forEach(template => {
        template.addEventListener('click', function () {
            // 移除所有选中状态
            document.querySelectorAll('.template').forEach(t => {
                t.classList.remove('selected');
            });

            // 添加当前选中状态
            this.classList.add('selected');

            // 更新Widget尺寸
            const templateType = this.dataset.template;
            updateWidgetSize(templateType);

            // 更新辅助线
            updateGuideLines();

            // 确保选中widget
            selectWidget();
        });
    });

    // 上传素材
    document.getElementById('uploadMaterial').addEventListener('change', function (e) {
        if (e.target.files && e.target.files.length > 0) {
            // 处理所有选中的文件
            const files = Array.from(e.target.files);
            files.forEach(file => {
                handleMaterialUpload(file).catch(error => {
                    console.error('上传失败:', error);
                    alert(`上传失败: ${file.name}`);
                });
            });

            // 重置文件输入
            this.value = '';
        }
    });

    // 点击加号按钮也触发文件选择
    document.getElementById('uploadMaterialBtn').addEventListener('click', function (e) {
        if (!e.target.classList.contains('fa-plus')) return;
        document.getElementById('uploadMaterial').click();
    });

    // 添加文字按钮
    document.getElementById('addTextBtn').addEventListener('click', function () {
        addTextElement();
    });

    // 统一处理所有形状按钮
    document.querySelectorAll('[data-shape]').forEach(button => {
        button.addEventListener('click', () => {
            addShapeElement(button.dataset.shape);
        });
    });

    // 统一处理所有模块按钮
    document.querySelectorAll('[data-module]').forEach(button => {
        button.addEventListener('click', () => {
            const moduleType = button.dataset.module;
            addModuleElement(moduleType);
        });
    });

    // 已上传素材列表折叠/展开
    uploadedMaterialsHeader.addEventListener('click', function () {
        this.classList.toggle('collapsed');
        uploadedMaterialsList.classList.toggle('collapsed');
    });

    // 已添加文字列表折叠/展开
    textMaterialsHeader.addEventListener('click', function () {
        this.classList.toggle('collapsed');
        textMaterialsList.classList.toggle('collapsed');
    });

    // 已添加形状列表折叠/展开
    shapeMaterialsHeader.addEventListener('click', function () {
        this.classList.toggle('collapsed');
        shapeMaterialsList.classList.toggle('collapsed');
    });

    // 已添加模块列表折叠/展开
    moduleMaterialsHeader.addEventListener('click', function () {
        this.classList.toggle('collapsed');
        moduleMaterialsList.classList.toggle('collapsed');
    });

    // 上传背景图片
    document.getElementById('backgroundUploadContainer').addEventListener('change', function (e) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                // 清除其他背景设置
                currentGradient = null;

                // 设置背景图片
                currentBackgroundImage = e.target.result;
                widgetContainer.style.backgroundImage = `url(${currentBackgroundImage})`;
                widgetContainer.style.background = `url(${currentBackgroundImage})`;
                widgetContainer.style.backgroundColor = 'transparent';
                widgetContainer.style.backgroundSize = 'cover';
                widgetContainer.style.backgroundPosition = 'center';
                widgetContainer.style.backgroundRepeat = 'no-repeat';

                // 重置颜色选择器
                const bgColorInput = document.getElementById('widgetBgColor');
                const colorPreview = document.querySelector('.color-option.selected');
                if (colorPreview) {
                    colorPreview.classList.remove('selected');
                }
                if (bgColorInput) {
                    bgColorInput.value = '#ffffff';
                }

                updateWidgetDataViews();
            };

            reader.readAsDataURL(file);
            this.value = '';
        }
    });

    // 清除背景图片
    document.getElementById('clearBackgroundBtn').addEventListener('click', function () {
        // 清除所有背景设置，恢复默认白色
        currentBackgroundImage = null;
        currentGradient = null;
        widgetContainer.style.backgroundImage = 'none';
        widgetContainer.style.backgroundColor = '#ffffff';
        widgetContainer.style.background = '#ffffff';

        // 重置颜色选择器
        const bgColorInput = document.getElementById('widgetBgColor');
        const colorPreview = document.querySelector('.color-option.selected');
        if (colorPreview) {
            colorPreview.classList.remove('selected');
        }
        if (bgColorInput) {
            bgColorInput.value = '#ffffff';
        }

        // 选中白色预设
        document.querySelector('.color-option[data-color="#ffffff"]').classList.add('selected');

        updateWidgetDataViews();
    });

    // 渐变类型选择
    document.querySelectorAll('.gradient-type').forEach(typeBtn => {
        typeBtn.addEventListener('click', function () {
            // 移除所有选中状态
            document.querySelectorAll('.gradient-type').forEach(btn => {
                btn.classList.remove('selected');
            });

            // 添加当前选中状态
            this.classList.add('selected');

            // 更新渐变类型
            currentGradientType = this.dataset.type;

            // 更新渐变预览
            updateGradientPreview();
        });
    });

    document.querySelectorAll('#shapeGradientEditor .gradient-type').forEach(typeBtn => {
        typeBtn.addEventListener('click', function () {
            document.querySelectorAll('#shapeGradientEditor .gradient-type').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            currentShapeData.gradientType = this.dataset.type;
            updateShapeGradientPreview();
        });
    });
    // 添加颜色停止点按钮
    document.getElementById('addStopBtn').addEventListener('click', function () {
        addGradientStop();
    });

    document.getElementById('shapeAddStopBtn').addEventListener('click', function () {
        addShapeGradientStop();
    });

    // 应用渐变按钮
    document.getElementById('applyGradientBtn').addEventListener('click', function () {
        applyGradientBackground();
    });

    document.getElementById('shapeApplyGradientBtn').addEventListener('click', function () {
        applyShapeGradient();
    });

    // 清除渐变按钮
    document.getElementById('clearGradientBtn').addEventListener('click', function () {
        // 如果当前应用了渐变背景，则清除渐变恢复为默认白色背景，同时恢复默认渐变
        if (currentGradient) {
            // 清除渐变，恢复纯色背景
            currentGradient = null;
            widgetContainer.style.background = '#ffffff';
            widgetContainer.style.backgroundColor = '#ffffff';
            widgetContainer.style.backgroundImage = 'none';

            // 重置颜色选择器
            const bgColorInput = document.getElementById('widgetBgColor');
            const colorPreview = document.querySelector('.color-option.selected');
            if (colorPreview) {
                colorPreview.classList.remove('selected');
            }
            if (bgColorInput) {
                bgColorInput.value = '#ffffff';
            }

            // 选中白色预设
            document.querySelector('.color-option[data-color="#ffffff"]').classList.add('selected');

            updateWidgetDataViews();
            initGradientEditor();
        } else {
            // 如果当前没有应用渐变，则只是重置渐变编辑器为默认渐变
            initGradientEditor();
        }
    });

    document.getElementById('shapeClearGradientBtn').addEventListener('click', function () {
        clearShapeGradient();
    });

    // 点击widget选中
    widgetContainer.addEventListener('mousedown', function (e) {
        // 如果点击的是子元素，不选中widget
        if (e.target !== widgetContainer &&
            !e.target.classList.contains('guide-lines') &&
            !e.target.classList.contains('widget-content') &&
            !e.target.closest('.draggable-element') &&
            !e.target.closest('.text-element') &&
            !e.target.closest('.shape-element') &&
            !e.target.closest('.module-element') &&
            !e.target.closest('.analog-clock-element') &&
            !e.target.closest('.weather-icon-element') &&
            !e.target.closest('.temperature-element')) {
            return;
        }

        e.stopPropagation();
        selectWidget();
    });

    // 缩放控制
    document.getElementById('zoomInPreviewBtn').addEventListener('click', zoomIn);
    document.getElementById('zoomOutPreviewBtn').addEventListener('click', zoomOut);
    document.getElementById('zoomResetPreviewBtn').addEventListener('click', function () {
        resetZoom();
        // 同时重置widget位置到预览区域中心
        resetWidgetPosition();
        // 如果widget尺寸被修改过，恢复为当前模板的默认尺寸
        restoreWidgetSize();
    });

    // Widget属性
    document.getElementById('widgetName').addEventListener('input', function () {
        widgetData.name = this.value;
    });

    document.getElementById('widgetVersion').addEventListener('input', function () {
        widgetData.version = parseInt(this.value) || 1;
    });

    document.getElementById('widgetSize').addEventListener('change', function () {
        const size = this.value.split('x');
        widgetData.span_x = parseInt(size[0]);
        widgetData.span_y = parseInt(size[1]);

        // 更新辅助线
        updateGuideLines();

        // 更新widgetData中的position
        const gridSize = getGridSize();
        widgetData.layer[0].position.width = gridSize.x;
        widgetData.layer[0].position.height = gridSize.y;

        // 重新应用所有元素的位置
        document.querySelectorAll('.draggable-element').forEach(element => {
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            applyElementPosition(element, x, y);
        });

        document.querySelectorAll('.text-element').forEach(element => {
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            applyElementPosition(element, x, y);
        });

        document.querySelectorAll('.shape-element').forEach(element => {
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            applyElementPosition(element, x, y);
        });

        document.querySelectorAll('.module-element').forEach(element => {
            const x = parseInt(element.dataset.x) || 0;
            const y = parseInt(element.dataset.y) || 0;
            applyElementPosition(element, x, y);
        });

        // 更新widget尺寸
        updateWidgetSize(`${widgetData.span_x}x${widgetData.span_y}`);
    });

    document.getElementById('opacity').addEventListener('input', function () {
        const opacity = parseInt(this.value) / 100;
        widgetContainer.style.opacity = opacity;
    });

    // 颜色选择器输入事件
    document.getElementById('widgetBgColor').addEventListener('input', function () {
        const color = this.value;

        // 清除其他背景设置
        currentBackgroundImage = null;
        currentGradient = null;
        widgetContainer.style.backgroundImage = 'none';

        // 设置纯色背景
        widgetContainer.style.backgroundColor = color;
        widgetContainer.style.background = color;

        // 更新预设颜色选中状态
        document.querySelectorAll('.color-option').forEach(c => {
            c.classList.remove('selected');
            if (c.dataset.color === color) {
                c.classList.add('selected');
            }
        });
    });

    // 预设颜色点击事件
    document.querySelectorAll('.color-option').forEach(colorOption => {
        colorOption.addEventListener('click', function () {
            // 移除所有选中状态
            document.querySelectorAll('.color-option').forEach(c => {
                c.classList.remove('selected');
            });

            // 添加当前选中状态
            this.classList.add('selected');

            // 清除其他背景设置
            currentBackgroundImage = null;
            currentGradient = null;
            widgetContainer.style.backgroundImage = 'none';

            // 应用背景颜色
            const color = this.dataset.color;
            widgetContainer.style.backgroundColor = color;
            widgetContainer.style.background = color;

            // 更新颜色选择器输入框
            document.getElementById('widgetBgColor').value = color;

            updateWidgetDataViews();
        });
    });

    // 网格颜色选择
    document.querySelectorAll('.grid-color-option').forEach(colorOption => {
        colorOption.addEventListener('click', function () {
            // 移除所有选中状态
            document.querySelectorAll('.grid-color-option').forEach(c => {
                c.classList.remove('selected');
            });

            // 添加当前选中状态
            this.classList.add('selected');

            // 更新辅助线颜色
            currentGuideColor = this.dataset.color;

            // 立即更新所有辅助线颜色
            const guideLines = document.querySelectorAll('.guide-line');
            guideLines.forEach(line => {
                line.style.backgroundColor = currentGuideColor;
            });

            // 重新生成辅助线以确保颜色生效
            updateGuideLines();
        });
    });

    // 素材属性
    document.getElementById('materialWidth').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const gridWidth = parseInt(this.value) || 1;
            // 限制范围
            const validWidth = Math.max(1, Math.min(30, gridWidth));
            applyElementSize(selectedElement, validWidth, currentMaterialData.height, 'material');
            currentMaterialData.width = validWidth;
            this.value = validWidth; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('materialHeight').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const gridHeight = parseInt(this.value) || 1;
            // 限制范围
            const validHeight = Math.max(1, Math.min(30, gridHeight));
            applyElementSize(selectedElement, currentMaterialData.width, validHeight, 'material');
            currentMaterialData.height = validHeight;
            this.value = validHeight; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('materialX').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const x = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validX = Math.max(0, Math.min(gridSize.x, x));
            applyElementPosition(selectedElement, validX, currentMaterialData.y);
            currentMaterialData.x = validX;
            this.value = validX; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('materialY').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const y = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validY = Math.max(0, Math.min(gridSize.y, y));
            applyElementPosition(selectedElement, currentMaterialData.x, validY);
            currentMaterialData.y = validY;
            this.value = validY; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('materialRotation').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const rotation = parseInt(this.value);
            selectedElement.style.transform = `rotate(${rotation}deg)`;
            currentMaterialData.rotation = rotation;
            updateWidgetDataViews();
        }
    });

    document.getElementById('materialOpacity').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const opacity = parseInt(this.value) / 100;
            selectedElement.style.opacity = opacity;
            currentMaterialData.opacity = opacity * 100;
            updateWidgetDataViews();
        }
    });

    // 文字属性
    document.getElementById('textContent').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const content = this.value;
            const textElement = selectedElement.querySelector('.text-element-content');
            if (textElement) {
                textElement.textContent = content;
            }

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.content = content;
                // 更新文字列表中的预览
                const textItem = document.querySelector(`.text-material[data-id="${textData.id}"] .text-material-content`);
                if (textItem) {
                    textItem.textContent = content.length > 20 ?
                        content.substring(0, 18) + '...' : content;
                }
            }

            currentTextData.content = content;
            updateWidgetDataViews();
        }
    });

    document.getElementById('textName').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const name = this.value;

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.name = name;
                selectedElement.dataset.name = name;
                // 更新文字列表中的名称
                const textItem = document.querySelector(`.text-material[data-id="${textData.id}"] .text-material-name`);
                if (textItem) {
                    textItem.textContent = name;
                }
                textItem.parentElement.dataset.name = name;
            }

            currentTextData.name = name;
        }
    });

    document.getElementById('textWidth').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const gridWidth = parseInt(this.value) || 1;
            // 限制范围
            const validWidth = Math.max(1, Math.min(30, gridWidth));
            applyElementSize(selectedElement, validWidth, currentTextData.height, 'text');
            currentTextData.width = validWidth;
            this.value = validWidth; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('textHeight').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const gridHeight = parseInt(this.value) || 1;
            // 限制范围
            const validHeight = Math.max(1, Math.min(30, gridHeight));
            applyElementSize(selectedElement, currentTextData.width, validHeight, 'text');
            currentTextData.height = validHeight;
            this.value = validHeight; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('textSize').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const size = parseInt(this.value);
            // 去除范围限制，只验证是否为有效数字
            if (isNaN(size) || size <= 0) {
                // 如果输入无效，则恢复原来的值
                this.value = currentTextData.size;
                return;
            }
            const validSize = size;
            selectedElement.style.fontSize = `${validSize}px`;

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.size = validSize;
            }

            currentTextData.size = validSize;
            this.value = validSize; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('textColor').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const color = this.value;
            selectedElement.style.color = color;

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.color = color;
            }

            currentTextData.color = color;
            updateWidgetDataViews();
        }
    });

    document.getElementById('textFont').addEventListener('change', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const font = this.value;
            selectedElement.style.fontFamily = font;

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.font = font;
            }

            currentTextData.font = font;
            updateWidgetDataViews();
        }
    });

    document.getElementById('textX').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const x = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validX = Math.max(0, Math.min(gridSize.x, x));
            applyElementPosition(selectedElement, validX, currentTextData.y);

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.x = validX;
            }

            currentTextData.x = validX;
            this.value = validX; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('textY').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const y = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validY = Math.max(0, Math.min(gridSize.y, y));
            applyElementPosition(selectedElement, currentTextData.x, validY);

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.y = validY;
            }

            currentTextData.y = validY;
            this.value = validY; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('textRotation').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const rotation = parseInt(this.value);
            selectedElement.style.transform = `rotate(${rotation}deg)`;

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.rotation = rotation;
            }

            currentTextData.rotation = rotation;
            updateWidgetDataViews();
        }
    });

    document.getElementById('textOpacity').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const opacity = parseInt(this.value) / 100;
            selectedElement.style.opacity = opacity;

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.opacity = opacity * 100;
            }

            currentTextData.opacity = opacity * 100;
            updateWidgetDataViews();
        }
    });

    // 形状属性
    document.getElementById('shapeWidth').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const gridWidth = parseInt(this.value) || 1;
            // 限制范围
            const validWidth = Math.max(1, Math.min(30, gridWidth));
            applyElementSize(selectedElement, validWidth, currentShapeData.height, 'shape');
            currentShapeData.width = validWidth;
            this.value = validWidth; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('shapeHeight').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const gridHeight = parseInt(this.value) || 1;
            // 限制范围
            const validHeight = Math.max(1, Math.min(30, gridHeight));
            applyElementSize(selectedElement, currentShapeData.width, validHeight, 'shape');
            currentShapeData.height = validHeight;
            this.value = validHeight; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('shapeColor').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const color = this.value;
            currentShapeData.color = color;
            currentShapeData.gradient = null; // 清除渐变

            // 更新对应的shape数据
            const shapeData = shapeElements.find(s => s.id === currentShapeData.id);
            if (shapeData) {
                shapeData.color = color;
                shapeData.gradient = null;
                applyShapeStyle(selectedElement, shapeData);
            }
            updateWidgetDataViews();
        }
    });

    document.getElementById('shapeX').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const x = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validX = Math.max(0, Math.min(gridSize.x, x));
            applyElementPosition(selectedElement, validX, currentShapeData.y);
            currentShapeData.x = validX;
            this.value = validX; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('shapeY').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const y = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validY = Math.max(0, Math.min(gridSize.y, y));
            applyElementPosition(selectedElement, currentShapeData.x, validY);
            currentShapeData.y = validY;
            this.value = validY; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('shapeRotation').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const rotation = parseInt(this.value);
            selectedElement.style.transform = `rotate(${rotation}deg)`;
            currentShapeData.rotation = rotation;
            updateWidgetDataViews();
        }
    });

    document.getElementById('shapeOpacity').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const opacity = parseInt(this.value) / 100;
            selectedElement.style.opacity = opacity;
            currentShapeData.opacity = opacity * 100;
            updateWidgetDataViews();
        }
    });

    // 模块属性
    document.getElementById('moduleWidth').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const gridWidth = parseInt(this.value) || 1;
            // 限制范围
            const validWidth = Math.max(1, Math.min(30, gridWidth));
            applyElementSize(selectedElement, validWidth, currentModuleData.height, 'module');
            currentModuleData.width = validWidth;
            this.value = validWidth; // 更新输入框的值

            // 更新对应的module数据
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                updateModulePropertiesPanel(element);
            }

            updateWidgetDataViews();
        }
    });

    document.getElementById('moduleHeight').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const gridHeight = parseInt(this.value) || 1;
            // 限制范围
            const validHeight = Math.max(1, Math.min(30, gridHeight));
            applyElementSize(selectedElement, currentModuleData.width, validHeight, 'module');
            currentModuleData.height = validHeight;
            this.value = validHeight; // 更新输入框的值

            // 更新对应的module数据
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                updateModulePropertiesPanel(element);
            }

            updateWidgetDataViews();
        }
    });

    // 模块字号设置
    document.getElementById('moduleTextSize').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const textSize = parseInt(this.value);
            // 去除范围限制，只验证是否为有效数字
            if (isNaN(textSize) || textSize <= 0) {
                // 如果输入无效，则恢复原来的值
                this.value = currentModuleData.textSize;
                return;
            }
            const validSize = textSize;

            // 更新当前模块数据
            currentModuleData.textSize = validSize;

            // 更新对应的module数据
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                moduleData.textSize = validSize;

                // 应用样式到元素
                const contentElement = selectedElement.querySelector('.text-element-content');
                if (contentElement) {
                    contentElement.style.fontSize = validSize + 'px';
                }
            }
            this.value = validSize; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    // 模块字体颜色设置
    document.getElementById('moduleTextColor').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const textColor = this.value;

            // 更新当前模块数据
            currentModuleData.textColor = textColor;

            // 更新对应的module数据
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                moduleData.textColor = textColor;

                // 应用样式到元素
                const contentElement = selectedElement.querySelector('.text-element-content');
                if (contentElement) {
                    contentElement.style.color = textColor;
                }
            }
            updateWidgetDataViews();
        }
    });

    document.getElementById('moduleX').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const x = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validX = Math.max(0, Math.min(gridSize.x, x));
            applyElementPosition(selectedElement, validX, currentModuleData.y);
            currentModuleData.x = validX;
            this.value = validX; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    document.getElementById('moduleY').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const y = parseInt(this.value) || 0;
            const gridSize = getGridSize();
            // 限制范围
            const validY = Math.max(0, Math.min(gridSize.y, y));
            applyElementPosition(selectedElement, currentModuleData.x, validY);
            currentModuleData.y = validY;
            this.value = validY; // 更新输入框的值
            updateWidgetDataViews();
        }
    });

    // 日期格式选择
    document.getElementById('moduleDateFormat').addEventListener('change', function () {
        if (selectedElement && selectedElement.dataset.type === 'module' &&
            selectedElement.dataset.moduleType === 'calendar') {
            const dateFormat = this.value;

            // 更新当前模块数据
            currentModuleData.dateFormat = dateFormat;

            // 更新对应的module数据
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                moduleData.dateFormat = dateFormat;

                // 更新模块内容显示（预览）
                const contentElement = selectedElement.querySelector('.text-element-content');
                if (contentElement) {
                    // 根据选择的格式生成预览内容
                    let previewContent;
                    switch (dateFormat) {
                        case 'MMM dd':
                            previewContent = "Dec 15";
                            break;
                        case 'EEE':
                            previewContent = "Mon";
                            break;
                        default:
                            previewContent = "Dec 15";
                    }
                    contentElement.textContent = previewContent;
                    moduleData.content = previewContent; // 更新模块数据中的内容
                }
            }
            updateWidgetDataViews();
        }
    });

    // 星期格式选择
    document.getElementById('moduleWeekFormat').addEventListener('change', function () {
        if (selectedElement && selectedElement.dataset.type === 'module' &&
            selectedElement.dataset.moduleType === 'week') {
            const weekFormat = this.value;

            // 更新当前模块数据
            currentModuleData.weekFormat = weekFormat;

            // 更新对应的module数据
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                moduleData.weekFormat = weekFormat;

                // 更新模块内容显示（预览）
                const contentElement = selectedElement.querySelector('.text-element-content');
                if (contentElement) {
                    // 根据选择的格式生成预览内容
                    let previewContent;
                    switch (weekFormat) {
                        case "MMMM dd'th', 'week'":
                            previewContent = "Dec 15th, Mon";
                            break;
                        case 'Week: ww/52':
                            previewContent = "Week: 43/52";
                            break;
                        case 'Wk: ww/52':
                            previewContent = "Wk: 43/52";
                            break;
                        case 'ww':
                            previewContent = "43";
                            break;
                        case 'ww/52':
                            previewContent = "43/52";
                            break;
                        case 'Wk ww':
                            previewContent = "Wk 43";
                            break;
                        default:
                            previewContent = "MMMM dd'th', 'week'";
                    }
                    contentElement.textContent = previewContent;
                    moduleData.content = previewContent; // 更新模块数据中的内容
                }
            }
            updateWidgetDataViews();
        }
    });

    // 素材图层控制
    document.getElementById('bringForwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            selectedElement.style.zIndex = currentZIndex + 1;
            currentMaterialData.zIndex = currentZIndex + 1;

            // 更新对应的material数据
            const material = uploadedMaterials.find(m => m.id === currentMaterialData.id);
            if (material) {
                material.zIndex = currentZIndex + 1;
            }
            updateWidgetDataViews();
        }
    });

    document.getElementById('sendBackwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'material') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            if (currentZIndex > 1) {
                selectedElement.style.zIndex = currentZIndex - 1;
                currentMaterialData.zIndex = currentZIndex - 1;

                // 更新对应的material数据
                const material = uploadedMaterials.find(m => m.id === currentMaterialData.id);
                if (material) {
                    material.zIndex = currentZIndex - 1;
                }
                updateWidgetDataViews();
            }
        }
    });

    // 文字图层控制
    document.getElementById('textBringForwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            selectedElement.style.zIndex = currentZIndex + 1;

            // 更新对应的text数据
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.zIndex = currentZIndex + 1;
            }

            currentTextData.zIndex = currentZIndex + 1;
            updateWidgetDataViews();
        }
    });

    document.getElementById('textSendBackwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            if (currentZIndex > 1) {
                selectedElement.style.zIndex = currentZIndex - 1;

                // 更新对应的text数据
                const textData = textElements.find(t => t.id === currentTextData.id);
                if (textData) {
                    textData.zIndex = currentZIndex - 1;
                }

                currentTextData.zIndex = currentZIndex - 1;
                updateWidgetDataViews();
            }
        }
    });

    // 形状图层控制
    document.getElementById('shapeBringForwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            selectedElement.style.zIndex = currentZIndex + 1;
            currentShapeData.zIndex = currentZIndex + 1;

            // 更新对应的shape数据
            const shapeData = shapeElements.find(s => s.id === currentShapeData.id);
            if (shapeData) {
                shapeData.zIndex = currentZIndex + 1;
            }
            updateWidgetDataViews();
        }
    });

    document.getElementById('shapeSendBackwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'shape') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            if (currentZIndex > 1) {
                selectedElement.style.zIndex = currentZIndex - 1;
                currentShapeData.zIndex = currentZIndex - 1;

                // 更新对应的shape数据
                const shapeData = shapeElements.find(s => s.id === currentShapeData.id);
                if (shapeData) {
                    shapeData.zIndex = currentZIndex - 1;
                }
                updateWidgetDataViews();
            }
        }
    });

    // 模块图层控制
    document.getElementById('moduleBringForwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            selectedElement.style.zIndex = currentZIndex + 1;
            currentModuleData.zIndex = currentZIndex + 1;

            // 更新对应的module数据
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                moduleData.zIndex = currentZIndex + 1;
            }
            updateWidgetDataViews();
        }
    });

    document.getElementById('moduleSendBackwardBtn').addEventListener('click', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const currentZIndex = parseInt(selectedElement.style.zIndex || 10);
            if (currentZIndex > 1) {
                selectedElement.style.zIndex = currentZIndex - 1;
                currentModuleData.zIndex = currentZIndex - 1;

                // 更新对应的module数据
                const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
                if (moduleData) {
                    moduleData.zIndex = currentZIndex - 1;
                }
                updateWidgetDataViews();
            }
        }
    });

    // 导出配置按钮
    document.getElementById('exportBtn').addEventListener('click', function () {
        // 更新widgetData
        updateWidgetDataViews();
        generateJsonOutput();
        exportModal.style.display = 'flex';

        // 更新预览图
        updateConfigPreview();
    });

    // 监听配置预览图的分辨率变化
    document.getElementById('configResolutionSelect').addEventListener('change', function () {
        configExportScale = parseFloat(this.value);
        updateConfigPreview();
    });

    // 监听配置预览图的格式变化
    document.getElementById('configFormatSelect').addEventListener('change', function () {
        configExportFormat = this.value;
        // 格式变化不需要重新渲染，只在导出时使用
    });

    // 关闭配置模态框
    document.getElementById('closeExportModal').addEventListener('click', function () {
        exportModal.style.display = 'none';
    });

    // 复制JSON按钮
    document.getElementById('copyJson').addEventListener('click', function () {
        const jsonText = jsonOutput.textContent;
        navigator.clipboard.writeText(jsonText).then(() => {
            alert('JSON配置已复制到剪贴板');
        });
    });

    // 导出ZIP包按钮
    document.getElementById('exportZipBtn').addEventListener('click', function () {
        // 禁用按钮防止重复点击
        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
        btn.disabled = true;

        generateExportZip().finally(() => {
            // 恢复按钮状态
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    });


    // 点击模态框外部关闭
    exportModal.addEventListener('click', function (e) {
        if (e.target === exportModal) {
            exportModal.style.display = 'none';
        }
    });

    // 文字大小事件监听器 - 支持网格数量
    document.getElementById('textSize').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'text') {
            const textSize = parseFloat(this.value);
            if (isNaN(textSize) || textSize <= 0) {
                this.value = currentTextData.size;
                return;
            }
            const validSize = Math.min(Math.max(0.5, textSize), 30);

            currentTextData.size = validSize;
            const textData = textElements.find(t => t.id === currentTextData.id);
            if (textData) {
                textData.size = validSize;
                applyTextStyle(textData.element, textData);
            }
            this.value = validSize;
            updateWidgetDataViews();
        }
    });

    // 模块字号事件监听器 - 支持网格数量
    document.getElementById('moduleTextSize').addEventListener('input', function () {
        if (selectedElement && selectedElement.dataset.type === 'module') {
            const textSize = parseFloat(this.value);
            if (isNaN(textSize) || textSize <= 0) {
                this.value = currentModuleData.textSize;
                return;
            }
            const validSize = Math.min(Math.max(0.5, textSize), 30);

            currentModuleData.textSize = validSize;
            const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
            if (moduleData) {
                moduleData.textSize = validSize;
                applyModuleStyle(moduleData.element, moduleData);
            }
            this.value = validSize;
            updateWidgetDataViews();
        }
    });

    // 文字对齐按钮事件监听
    document.querySelectorAll('#textPanel .alignment-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const align = this.dataset.align;
            const value = this.dataset.value;

            if (selectedElement && selectedElement.dataset.type === 'text') {
                // 更新按钮状态
                updateAlignmentButtons('text',
                    align === 'horizontal' ? value : currentTextData.hAlign,
                    align === 'vertical' ? value : currentTextData.vAlign
                );

                // 更新数据
                if (align === 'horizontal') {
                    currentTextData.hAlign = value;
                } else {
                    currentTextData.vAlign = value;
                }

                // 更新对应的text数据
                const textData = textElements.find(t => t.id === currentTextData.id);
                if (textData) {
                    if (align === 'horizontal') {
                        textData.hAlign = value;
                    } else {
                        textData.vAlign = value;
                    }
                    // 应用样式
                    applyTextStyle(textData.element, textData);
                }

                // 更新widgetData
                updateWidgetDataViews();
            }
        });
    });

    // 模块对齐按钮事件监听
    document.querySelectorAll('#modulePanel .alignment-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const align = this.dataset.align;
            const value = this.dataset.value;

            if (selectedElement && selectedElement.dataset.type === 'module') {
                // 更新按钮状态
                updateAlignmentButtons('module',
                    align === 'horizontal' ? value : currentModuleData.hAlign,
                    align === 'vertical' ? value : currentModuleData.vAlign
                );

                // 更新数据
                if (align === 'horizontal') {
                    currentModuleData.hAlign = value;
                } else {
                    currentModuleData.vAlign = value;
                }

                // 更新对应的module数据
                const moduleData = moduleElements.find(m => m.id === currentModuleData.id);
                if (moduleData) {
                    if (align === 'horizontal') {
                        moduleData.hAlign = value;
                    } else {
                        moduleData.vAlign = value;
                    }
                    // 应用样式
                    applyModuleStyle(moduleData.element, moduleData);
                }

                // 更新widgetData
                updateWidgetDataViews();
            }
        });
    });

    // 时钟图片预览区域
    document.querySelectorAll('.clock-image-preview').forEach(preview => {
        preview.addEventListener('click', function () {
            // 查找对应的文件输入框
            const inputId = this.id.replace('Preview', '');
            const input = document.getElementById(inputId);
            if (input) input.click();
        });
    });
}

// 生成预览图片
function generatePreviewImage() {
    return new Promise((resolve, reject) => {
        const canvas = document.getElementById('configPreviewCanvas');

        // 确保canvas有内容
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
            updateConfigPreview();
            // 稍等片刻让canvas渲染
            setTimeout(() => {
                generateImageFromCanvas(canvas).then(resolve).catch(reject);
            }, 100);
        } else {
            generateImageFromCanvas(canvas).then(resolve).catch(reject);
        }
    });
}

// 从canvas生成图片
function generateImageFromCanvas(canvas) {
    return new Promise((resolve, reject) => {
        try {
            switch (configExportFormat) {
                case 'png':
                    canvas.toBlob(blob => {
                        if (blob) resolve(blob);
                        else reject(new Error('无法生成PNG图片'));
                    }, 'image/png');
                    break;

                case 'jpeg':
                    canvas.toBlob(blob => {
                        if (blob) resolve(blob);
                        else reject(new Error('无法生成JPEG图片'));
                    }, 'image/jpeg', 0.95);
                    break;

                case 'webp':
                    canvas.toBlob(blob => {
                        if (blob) resolve(blob);
                        else reject(new Error('无法生成WebP图片'));
                    }, 'image/webp', 0.95);
                    break;

                default:
                    reject(new Error('不支持的图片格式'));
            }
        } catch (error) {
            reject(error);
        }
    });
}

// 生成JSON输出
function generateJsonOutput() {
    // 更新widget数据
    updateWidgetDataViews();

    // 格式化JSON
    const jsonString = JSON.stringify(widgetData, null, 2);

    // 显示在模态框中
    jsonOutput.textContent = jsonString;

    // 高亮显示
    jsonOutput.innerHTML = jsonString
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            match => {
                let cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return `<span class="${cls}">${match}</span>`;
            });
}

// 更新配置预览图
function updateConfigPreview() {
    const canvas = document.getElementById('configPreviewCanvas');
    const ctx = canvas.getContext('2d');

    // 固定预览图显示大小
    const displayWidth = 312;
    const displayHeight = 150;

    // 实际绘制尺寸（根据导出缩放比例）
    const actualWidth = displayWidth * configExportScale;
    const actualHeight = displayHeight * configExportScale;

    // 设置canvas的实际像素尺寸
    canvas.width = actualWidth;
    canvas.height = actualHeight;

    // 设置canvas的CSS显示尺寸（固定大小）
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // 获取widget容器的状态
    const tempDiv = document.createElement('div');
    tempDiv.style.width = `${widgetContainer.offsetWidth}px`;
    tempDiv.style.height = `${widgetContainer.offsetHeight}px`;
    tempDiv.style.position = 'relative';
    tempDiv.style.overflow = 'hidden';

    // 克隆widget内容
    const clone = widgetContainer.cloneNode(true);
    clone.style.width = `${widgetContainer.offsetWidth}px`;
    clone.style.height = `${widgetContainer.offsetHeight}px`;
    clone.style.position = 'absolute';
    clone.style.left = '0';
    clone.style.top = '0';
    clone.style.transform = 'none'; // 移除缩放变换

    // 移除控制点和辅助线
    const resizeHandles = clone.querySelectorAll('.resize-handle');
    resizeHandles.forEach(handle => handle.remove());

    const guideLines = clone.querySelector('#guideLines');
    if (guideLines) guideLines.remove();

    tempDiv.appendChild(clone);
    document.body.appendChild(tempDiv);

    // 使用html2canvas渲染
    html2canvas(tempDiv, {
        width: widgetContainer.offsetWidth,
        height: widgetContainer.offsetHeight,
        scale: configExportScale,
        backgroundColor: null,
        removeContainer: true
    }).then(canvas => {
        // 计算缩放比例以适应固定预览区域
        const widgetRatio = widgetContainer.offsetWidth / widgetContainer.offsetHeight;
        const previewRatio = displayWidth / displayHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (widgetRatio > previewRatio) {
            // widget更宽，宽度占满
            drawWidth = actualWidth;
            drawHeight = actualWidth / widgetRatio;
            offsetX = 0;
            offsetY = (actualHeight - drawHeight) / 2;
        } else {
            // widget更高，高度占满
            drawHeight = actualHeight;
            drawWidth = actualHeight * widgetRatio;
            offsetX = (actualWidth - drawWidth) / 2;
            offsetY = 0;
        }

        // 清除画布
        ctx.clearRect(0, 0, actualWidth, actualHeight);

        // 绘制背景（白色）
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, actualWidth, actualHeight);

        // 绘制widget内容
        ctx.drawImage(canvas, offsetX, offsetY, drawWidth, drawHeight);

        // 清理
        document.body.removeChild(tempDiv);

        // 更新预览图显示
        exportPreview.innerHTML = '';
        const img = document.createElement('img');
        img.src = previewCanvas.toDataURL(`image/${configExportFormat}`);
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        exportPreview.appendChild(img);
    }).catch(error => {
        console.error('预览图生成失败:', error);
        // 显示错误信息
        exportPreview.innerHTML = '<div class="preview-error">预览图生成失败，请重试</div>';
    });
}

// 绘制Widget到Canvas
function drawWidgetToCanvas(ctx, width, height) {
    // 清除Canvas
    ctx.clearRect(0, 0, width, height);

    // 绘制背景
    if (currentBackgroundImage) {
        const bgImg = new Image();
        bgImg.onload = function () {
            // 绘制圆角矩形背景
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(0, 0, width, height, 40);
            ctx.clip();
            ctx.drawImage(bgImg, 0, 0, width, height);
            ctx.restore();
        };
        bgImg.src = currentBackgroundImage;
    } else if (currentGradient) {
        // 绘制渐变背景
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, 40);
        ctx.clip();

        // 尝试解析渐变字符串
        try {
            // 创建临时元素来应用渐变
            const tempDiv = document.createElement('div');
            tempDiv.style.width = width + 'px';
            tempDiv.style.height = height + 'px';
            tempDiv.style.background = currentGradient;
            document.body.appendChild(tempDiv);

            // 获取计算后的背景
            const computedStyle = window.getComputedStyle(tempDiv);
            const bgImage = computedStyle.backgroundImage;

            // 移除临时元素
            document.body.removeChild(tempDiv);

            // 应用渐变
            ctx.fillStyle = currentGradient;
            ctx.fillRect(0, 0, width, height);
        } catch (e) {
            // 如果渐变解析失败，使用默认渐变
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#BCEEFD');
            gradient.addColorStop(1, '#FFDBDB');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        ctx.restore();
    } else {
        ctx.fillStyle = widgetContainer.style.backgroundColor || '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, 40);
        ctx.fill();
    }

    // 绘制所有素材
    uploadedMaterials.forEach(material => {
        if (material.element && material.element.style.display !== 'none') {
            const element = material.element;
            const gridSize = getGridSize();

            // 获取位置
            const x = (parseInt(element.dataset.x) / gridSize.x) * width;
            const y = (parseInt(element.dataset.y) / gridSize.y) * height;

            // 获取格子尺寸
            const gridWidth = parseInt(element.dataset.gridWidth) || 5;
            const gridHeight = parseInt(element.dataset.gridHeight) || 5;

            // 计算像素尺寸
            const elementWidth = (gridWidth / gridSize.x) * width;
            const elementHeight = (gridHeight / gridSize.y) * height;

            // 获取旋转角度
            const rotation = parseInt(element.style.transform?.match(/rotate\(([^)]+)deg\)/)?.[1] || 0);

            // 获取不透明度
            const opacity = parseFloat(element.style.opacity || 1);

            // 保存上下文状态
            ctx.save();

            // 设置不透明度
            ctx.globalAlpha = opacity;

            // 设置旋转中心并旋转
            ctx.translate(x + elementWidth / 2, y + elementHeight / 2);
            ctx.rotate(rotation * Math.PI / 180);

            // 绘制图片
            const img = new Image();
            img.src = material.dataUrl;

            // 由于图片加载是异步的，这里简化处理
            // 在实际应用中，可能需要等待所有图片加载完成
            try {
                ctx.drawImage(img, -elementWidth / 2, -elementHeight / 2, elementWidth, elementHeight);
            } catch (e) {
                // 如果图片还没加载好，绘制一个占位矩形
                ctx.fillStyle = '#6a89cc';
                ctx.fillRect(-elementWidth / 2, -elementHeight / 2, elementWidth, elementHeight);
            }

            // 恢复上下文状态
            ctx.restore();
        }
    });

    // 绘制所有形状
    shapeElements.forEach(shape => {
        if (shape.element && shape.element.style.display !== 'none') {
            const element = shape.element;
            const gridSize = getGridSize();

            // 获取位置
            const x = (parseInt(element.dataset.x) / gridSize.x) * width;
            const y = (parseInt(element.dataset.y) / gridSize.y) * height;

            // 获取格子尺寸
            const gridWidth = parseInt(element.dataset.gridWidth) || 5;
            const gridHeight = parseInt(element.dataset.gridHeight) || 5;

            // 计算像素尺寸
            const elementWidth = (gridWidth / gridSize.x) * width;
            const elementHeight = (gridHeight / gridSize.y) * height;

            // 获取旋转角度
            const rotation = shape.rotation;

            // 获取不透明度
            const opacity = shape.opacity / 100;

            // 保存上下文状态
            ctx.save();

            // 设置不透明度
            ctx.globalAlpha = opacity;

            // 设置旋转中心并旋转
            ctx.translate(x + elementWidth / 2, y + elementHeight / 2);
            ctx.rotate(rotation * Math.PI / 180);

            // 根据形状类型绘制SVG或基本形状
            try {
                // 尝试绘制SVG
                const svg = element.querySelector('svg');
                if (svg) {
                    // 获取SVG的路径
                    const path = svg.querySelector('path, rect');
                    if (path) {
                        const fillColor = path.getAttribute('fill') || '#6a89cc';
                        ctx.fillStyle = fillColor;

                        // 简化处理：绘制一个与SVG形状类似的形状
                        if (shape.type === 'circle') {
                            ctx.beginPath();
                            ctx.arc(0, 0, Math.min(elementWidth, elementHeight) / 2, 0, Math.PI * 2);
                            ctx.fill();
                        } else if (shape.type === 'triangle') {
                            ctx.beginPath();
                            ctx.moveTo(0, -elementHeight / 2);
                            ctx.lineTo(elementWidth / 2, elementHeight / 2);
                            ctx.lineTo(-elementWidth / 2, elementHeight / 2);
                            ctx.closePath();
                            ctx.fill();
                        } else if (shape.type === 'star' || shape.type === 'fat-star' || shape.type === 'rounded-star') {
                            // 绘制简化版的星星
                            ctx.beginPath();
                            for (let i = 0; i < 5; i++) {
                                const angle = (i * 2 * Math.PI) / 5;
                                const outerX = 0 + Math.cos(angle - Math.PI / 2) * (elementWidth / 2);
                                const outerY = 0 + Math.sin(angle - Math.PI / 2) * (elementHeight / 2);
                                const innerAngle = angle + Math.PI / 5;
                                const innerX = 0 + Math.cos(innerAngle - Math.PI / 2) * (elementWidth / 4);
                                const innerY = 0 + Math.sin(innerAngle - Math.PI / 2) * (elementHeight / 4);

                                if (i === 0) {
                                    ctx.moveTo(outerX, outerY);
                                } else {
                                    ctx.lineTo(outerX, outerY);
                                }
                                ctx.lineTo(innerX, innerY);
                            }
                            ctx.closePath();
                            ctx.fill();
                        } else {
                            // 对于其他形状，绘制矩形
                            ctx.fillRect(-elementWidth / 2, -elementHeight / 2, elementWidth, elementHeight);
                        }
                    } else {
                        // 如果没有找到路径，绘制一个矩形
                        ctx.fillRect(-elementWidth / 2, -elementHeight / 2, elementWidth, elementHeight);
                    }
                } else {
                    // 如果没有SVG，绘制一个矩形
                    ctx.fillStyle = shape.color;
                    ctx.fillRect(-elementWidth / 2, -elementHeight / 2, elementWidth, elementHeight);
                }
            } catch (e) {
                // 如果出错，绘制一个简单的矩形
                ctx.fillStyle = shape.color;
                ctx.fillRect(-elementWidth / 2, -elementHeight / 2, elementWidth, elementHeight);
            }

            // 恢复上下文状态
            ctx.restore();
        }
    });

    // 绘制所有模块
    moduleElements.forEach(module => {
        if (module.element && module.element.style.display !== 'none') {
            const element = module.element;
            const gridSize = getGridSize();

            // 获取位置
            const x = (parseInt(element.dataset.x) / gridSize.x) * width;
            const y = (parseInt(element.dataset.y) / gridSize.y) * height;

            // 获取格子尺寸
            const gridWidth = parseInt(element.dataset.gridWidth) || 8;
            const gridHeight = parseInt(element.dataset.gridHeight) || 4;

            // 计算像素尺寸
            const elementWidth = (gridWidth / gridSize.x) * width;
            const elementHeight = (gridHeight / gridSize.y) * height;

            // 获取不透明度
            const opacity = 1;

            // 保存上下文状态
            ctx.save();

            // 设置不透明度
            ctx.globalAlpha = opacity;

            // 设置文字样式
            ctx.font = `${module.textSize || 24}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // 设置颜色
            if (module.type === 'clock' || module.type === 'calendar' || module.type === 'week') {
                ctx.fillStyle = module.textColor || "#000000";
            } else {
                ctx.fillStyle = module.textColor || "#000000";
            }

            // 计算文字位置
            const textX = x + elementWidth / 2;
            const textY = y + elementHeight / 2;

            // 绘制模块内容
            ctx.fillText(module.content, textX, textY);

            // 恢复上下文状态
            ctx.restore();
        }
    });

    // 绘制所有文字
    textElements.forEach(text => {
        if (shape.gradient && shape.gradient.stops && shape.gradient.stops.length > 0) {
            // 创建渐变
            let gradient;
            switch (shape.gradient.type || 'linear') {
                case 'linear':
                    gradient = ctx.createLinearGradient(
                        x, y,
                        x + elementWidth, y
                    );
                    break;
                case 'radial':
                    gradient = ctx.createRadialGradient(
                        x + elementWidth / 2, y + elementHeight / 2, 0,
                        x + elementWidth / 2, y + elementHeight / 2, Math.max(elementWidth, elementHeight) / 2
                    );
                    break;
                default:
                    gradient = ctx.createLinearGradient(
                        x, y,
                        x + elementWidth, y
                    );
            }

            // 添加颜色停止点
            const sortedStops = [...shape.gradient.stops].sort((a, b) => a.position - b.position);
            sortedStops.forEach(stop => {
                gradient.addColorStop(
                    stop.position / 100,
                    `rgba(${hexToRgb(stop.color).r}, ${hexToRgb(stop.color).g}, ${hexToRgb(stop.color).b}, ${stop.opacity / 100})`
                );
            });

            ctx.fillStyle = gradient;
        } else {
            // 使用纯色
            ctx.fillStyle = shape.color;
        }
        if (text.element && text.element.style.display !== 'none') {
            const element = text.element;
            const gridSize = getGridSize();

            // 获取位置
            const x = (parseInt(element.dataset.x) / gridSize.x) * width;
            const y = (parseInt(element.dataset.y) / gridSize.y) * height;

            // 获取格子尺寸
            const gridWidth = parseInt(element.dataset.gridWidth) || 8;
            const elementWidth = (gridWidth / gridSize.x) * width;

            // 获取旋转角度
            const rotation = text.rotation;

            // 获取不透明度
            const opacity = text.opacity / 100;

            // 保存上下文状态
            ctx.save();

            // 设置不透明度
            ctx.globalAlpha = opacity;

            // 设置旋转中心并旋转
            ctx.translate(x, y);
            ctx.rotate(rotation * Math.PI / 180);

            // 设置文字样式
            ctx.font = `${text.size}px ${text.font}`;
            ctx.fillStyle = text.color;
            ctx.textBaseline = 'top';

            // 绘制文字
            ctx.fillText(text.content, 0, 0);

            // 恢复上下文状态
            ctx.restore();
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
