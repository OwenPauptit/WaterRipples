class Ripple
{
    constructor(width, height, pixelSize)
    {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.pixelSize = pixelSize;
        this.cols = Math.floor(width/pixelSize)
        this.rows = Math.floor(height/pixelSize);
        this.damping = 0.97;

        this.current = [];
        this.previous = [];

        this.setupArrs();
        var temp = this.current.slice();
    }

    setupArrs = function()
    {
        for (var i = 0; i < this.cols; i++)
        {
            var temp = []
            for (var j = 0; j < this.rows; j++)
            {
                temp.push(0);
            }
            this.current.push(temp)
        }
        this.previous = this.current.slice()
    }

    addRandomPixels = function(n)
    {
        for (var k = 0; k < n; k++)
        {
            var i = Math.floor(Math.random() * this.cols);
            var j = Math.floor(Math.random() * this.rows);
            this.previous[i][j] = 500;
        }
    }

    draw = function(ctx)
    {
        
        //console.log(this.current);
        for (var i = 1; i < this.cols - 1; i++)
        {
            for (var j = 1; j < this.rows - 1; j++)
            {
                this.current[i][j] = 
                    ( this.previous[i-1][j] 
                    + this.previous[i+1][j]
                    + this.previous[i][j-1]
                    + this.previous[i][j+1]) / 2
                    - this.current[i][j];

                this.current[i][j] *= this.damping;

                
                var r = this.current[i][j] * 0.7;
                var b = this.current[i][j];
                var g = this.current[i][j] * 0.8;
                ctx.fillStyle = "rgb(" + String(r) + "," + String(g) + "," + String(b) + ")";
                ctx.fillRect(i*this.pixelSize,j*this.pixelSize,this.pixelSize,this.pixelSize);
            


                }
        }

        var temp = [];
        for (var i = 0; i < this.cols; i++)
        {
            temp.push(this.current[i].slice());
        };
        
        this.current = [];
        for (var i = 0; i < this.cols; i++)
        {
            this.current.push(this.previous[i].slice());
        };
        this.previous = [];
        for (var i = 0; i < this.cols; i++)
        {
            this.previous.push(temp[i].slice());
        };
    }

}